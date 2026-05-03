---
title: "Getting PicoClaw Running on a Xiaomi B3600 Pro WiFi Router"
date: 2026-04-07
description: "How I got PicoClaw and Tailscale running on a Xiaomi router with a read-only OpenWrt rootfs, barely any writable flash, and just enough RAM to be interesting"
tags: ["ai", "llm", "picoclaw", "router", "openwrt", "xiaomi", "hardware", "homelab", "tailscale"]
author: "Aditya Konarde"
showToc: true
TocOpen: false
hidemeta: false
comments: false
---

I am a bit of a Xiaomi fan, so when I spotted the B3600 Pro I bought it without a strong reason. The UI was entirely in Chinese, and my Vodafone station was already good enough for daily use, so the router ended up sitting on a shelf collecting dust.

Meanwhile, I have been running a fork of [PicoClaw](https://github.com/sipeed/picoclaw), a lightweight Go-based AI assistant, as my personal assistant for a while now. I have been genuinely impressed with how capable it is, so one day I looked at the idle router and thought: can I get PicoClaw running on that thing? Armed with my set of AI tools, I set out on an adventure.

It turned out to be more practical than I expected.

## The Starting Point

I used the trick to get the ssh password from the xiaomi dev panel. I won't go into detail here, but a quick google search should show you how.

Once I had SSH access, the device turned out to be a fairly interesting little box:

- Linux `5.4.213`
- Vendor-flavored `OpenWrt 18.06-SNAPSHOT`
- 4 ARMv7 cores
- Roughly `443 MB` of RAM

The hardware identified itself as `Qualcomm Technologies, Inc. IPQ5332/AP-MI04.1-C2`, which is a lot more useful than the marketing label when you are trying to figure out which binaries might run on it.

The good news was RAM. The bad news was storage.

## The Real Constraint Was storage

The router's root filesystem was mounted as read-only `squashfs`, and it was already full:

```text
/dev/mtdblock25 on / type squashfs (ro,noatime)
```

The writable persistent area lived under `/data`, and there was only about `7.4 MB` free there.

That immediately ruled out the obvious approach of treating the router like a normal Linux box and installing a bunch of packages into persistent flash. PicoClaw itself is lightweight at runtime, but the distribution artifacts are not tiny:

- `picoclaw_Linux_armv7.tar.gz`: about `19.6 MB`
- `picoclaw`: about `26.6 MB`
- `picoclaw-launcher`: about `19.5 MB`
- `picoclaw-launcher-tui`: about `7.3 MB`

So the challenge was not "can this CPU run PicoClaw?" It clearly can. The challenge was "where do I put the binaries?"

## Why PicoClaw Was a Good Fit Anyway

The thing that made this workable was the way PicoClaw is packaged.

At the time of writing on April 7, 2026, the latest PicoClaw release was [v0.2.5](https://github.com/sipeed/picoclaw/releases/tag/v0.2.5), and it included an official `Linux_armv7` tarball. That meant I did not need to build Go on the router, cross-compile manually, or fight with a vendor toolchain.

Even better, the binaries are self-contained enough that they run happily in a stripped-down BusyBox/OpenWrt environment.

In other words: this is exactly the sort of workload that benefits from a single Go binary.

I do maintain my own fork of picoclaw, with some bells and whistles inspired by other agents (OpenClaw, Heremes) and hardened much more than regular picoclaw. If picoclaw could run there, my assistant could too.

## The Trick: Use RAM for Binaries, Flash for Config

Instead of trying to persist everything, I split the setup into two parts:

1. Put the PicoClaw binaries in `/tmp`, which is backed by RAM and has plenty of space.
2. Keep only the configuration in `/root/.picoclaw`, which on this router is backed by persistent storage under `/data`.

That gave me the best of both worlds:

- enough space to unpack and run the binaries
- persistence for config and workspace
- no need to remount or rewrite the firmware rootfs

I briefly considered restoring a proper writable root overlay, but for this use case it was unnecessary risk. The vendor firmware was already using separate writable areas and bind mounts for persistent state. I did not need a "normal" Linux rootfs to make PicoClaw work.

## Minimal Userspace Improvements

Since `/` is read-only, I created a tiny extra userspace under `/data/opkg` and installed a couple of things there:

- `tmux`
- `bash`

That let me launch PicoClaw in a detached terminal session and keep it running independently of my SSH connection.

I also added a small `dopkg` alias so packages can be managed against `/data/opkg` without pretending the router has a normal writable root.

## What Actually Worked

The core setup ended up being surprisingly short.

First, fetch the official ARMv7 release:

```bash
curl -fL -o /tmp/picoclaw_Linux_armv7.tar.gz \
  https://github.com/sipeed/picoclaw/releases/download/v0.2.5/picoclaw_Linux_armv7.tar.gz

curl -fL -o /tmp/picoclaw_checksums.txt \
  https://github.com/sipeed/picoclaw/releases/download/v0.2.5/checksums.txt

cd /tmp && sha256sum -c picoclaw_checksums.txt --ignore-missing

mkdir -p /tmp/picoclaw
tar xzf /tmp/picoclaw_Linux_armv7.tar.gz -C /tmp/picoclaw
```

Then initialize the persistent config:

```bash
/tmp/picoclaw/picoclaw onboard
```

That created:

- `/root/.picoclaw/config.json`
- `/root/.picoclaw/.security.yml`
- `/root/.picoclaw/workspace/...`

The nice part is that the initial config footprint was tiny, around `100 KB`.

Finally, start the web launcher in `tmux`:

```bash
tmux new-session -d -s picoclaw \
  '/tmp/picoclaw/picoclaw-launcher -console -public -no-browser /root/.picoclaw/config.json'
```

After that, the Web UI came up on port `18800` and was reachable on the router's LAN IP.

## Runtime Footprint

This is where the experiment got fun.

The launcher's virtual memory size looked large in `ps`, which is common and not very useful on Linux. The number that mattered was resident memory:

- `VmRSS`: about `13.5 MB`

That is perfectly reasonable on a router with roughly `443 MB` RAM.

So in practice, PicoClaw was not stressing the device at all. It really does what it says on the Readme. You can run it on some seriously low powered devices.

## Making It Reusable

Since the binaries live in `/tmp`, they disappear on reboot. That is acceptable for testing, but annoying for daily use.

To make the setup repeatable, I added three tiny helper scripts under `/data`:

- `picoclaw-start.sh`
- `picoclaw-stop.sh`
- `picoclaw-status.sh`

The start script does three things:

1. Downloads the latest ARMv7 PicoClaw release into `/tmp` if the binaries are missing.
2. Initializes config if `/root/.picoclaw/config.json` does not exist.
3. Starts the launcher in a detached `tmux` session.

That keeps the persistent storage requirements extremely small while still making the setup feel "installed".

The next obvious step would be wiring `picoclaw-start.sh` into the router's existing `@reboot` flow so the Web UI comes back automatically after a reboot.

## Postscript: Tailscale Fit the Same Pattern

After getting PicoClaw working, I ended up applying the exact same idea to remote access.

I wanted the router reachable over Tailscale without depending on its LAN IP or the vendor SSH setup. The shape of the problem was almost identical to PicoClaw:

- the root filesystem was still read-only
- persistent flash was still tiny
- RAM-backed `/tmp` still had plenty of room

The router did have `opkg`, and it even exposed `tailscale` and `tailscaled` packages from an OpenWrt feed. But that path turned out to be a bad fit:

- the feed was serving an old `1.24.2` build
- `tailscale` wanted `kmod-tun` as a package dependency even though `/dev/net/tun` already existed on this kernel
- a normal package install would still have been awkward with only about `7 MB` free in persistent storage

So I used the official static ARM tarball instead and kept the same split:

- binaries in `/tmp`
- state in `/data/tailscale`

The core launch sequence looked like this:

```bash
mkdir -p /data/tailscale /tmp/tailscale

curl -fL -o /tmp/tailscale/tailscale.tgz \
  https://pkgs.tailscale.com/stable/tailscale_1.96.4_arm.tgz

tar xzf /tmp/tailscale/tailscale.tgz -C /tmp/tailscale

start-stop-daemon -S -b -m -p /tmp/tailscaled.pid \
  -x /tmp/tailscale/tailscale_1.96.4_arm/tailscaled -- \
  --state=/data/tailscale/tailscaled.state \
  --socket=/tmp/tailscaled.sock

/tmp/tailscale/tailscale_1.96.4_arm/tailscale \
  --socket=/tmp/tailscaled.sock \
  up --accept-dns=false --hostname=xiaomi-picoclaw
```

That gives the router a stable Tailscale identity while keeping the actual binaries ephemeral.

To make it survive reboot, I used a tiny `/data/tailscale-start.sh` bootstrap script. On this firmware, `/etc` is a RAM filesystem, so dropping something into `rc.local` is not actually a persistent solution. Instead, I added a line to the vendor's persistent init script under `/data` that sources the bootstrap on boot.

Once the node was enrolled, I enabled Tailscale SSH:

```bash
/tmp/tailscale/tailscale_1.96.4_arm/tailscale --socket=/tmp/tailscaled.sock set --ssh
```

That was the nicer finish to the whole experiment. The router no longer needed password-based SSH over the LAN. With Tailscale SSH enabled, I could connect to it as:

```bash
tailscale ssh root@xiaomi-picoclaw
```

So the end result was not just "PicoClaw runs on a weird router." It was "PicoClaw runs on a weird router that is also privately reachable from anywhere, without opening anything to the public internet."

## What I Did Not Do

A few things were intentionally left alone:

- I did not try to force the `squashfs` root filesystem to become writable (although, I am now curious how that's done)
- I did not build PicoClaw from source on-device.
- I did not enable Docker, chroots, or anything container-like. Just not enough space anyway.

All of those are possible rabbit holes, but they were unnecessary for now.

## Limitations

This setup works, but it has some clear constraints:

- The PicoClaw binaries are not persistent unless they are re-downloaded on boot.
- Internal flash is far too small for a larger userspace or heavy tooling.
- You still need to configure an LLM provider in PicoClaw before it becomes truly useful.
- This is much better as a tiny appliance than as a general-purpose server.
- Tailscale SSH still depends on having the right tailnet policy, because access is controlled by Tailscale identity rather than the router's local password database.

That said, those limitations are perfectly acceptable for a router-sized AI box.

## Why I Like This Kind of Hack

There is something satisfying about making inexpensive hardware do more than the manufacturer intended.

Routers are especially interesting because they already have:

- reliable networking
- low idle power consumption
- always-on operation
- decent ARM CPUs
- enough RAM for lightweight services

Once you stop thinking of them purely as "routers" and start thinking of them as "small Linux systems with very weird storage layouts", a lot of possibilities open up.

PicoClaw fits that mindset very well. It is lightweight enough to run comfortably, packaged well enough to avoid toolchain pain, and flexible enough to be useful even on constrained hardware.

## Final Thoughts

In the end, getting PicoClaw running on this Xiaomi router was less about raw compute and more about respecting the constraints of embedded Linux.

For a device that started life as a locked-down networking appliance, that is a pretty good outcome.

If I keep pushing this further, the next steps will probably be:

- auto-starting PicoClaw after reboot
- trimming more of the Xiaomi-specific services
- moving larger artifacts to external storage if I want a more permanent install
- advertising the LAN subnet through Tailscale so the router can double as a tiny subnet router

For now, though, I have a router that can host an AI assistant. That is already a pretty fun place to stop.

Credits to Codex and Amp. It would have taken me a long time banging my head against a Linux book without you. And I'd have never written this post.
