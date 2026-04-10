---
title: "TIL: Touch ID for sudo on macOS"
date: 2026-04-10
description: "How to enable Touch ID for sudo authentication on macOS in under a minute, and why it survives system updates"
tags: ["macos", "terminal", "developer-tools", "security"]
author: "Aditya Konarde"
showToc: false
TocOpen: false
hidemeta: false
comments: false
---

If you use the terminal on macOS, you've typed your password for `sudo` thousands of times. There's a better way. Touch ID works for sudo, and Apple even ships a template config for it. Most people just don't know it's there.

## The Setup

macOS includes a PAM (Pluggable Authentication Module) template at `/etc/pam.d/sudo_local.template` with the Touch ID line already written but commented out. All you need to do is copy it and uncomment:

```bash
sudo cp /etc/pam.d/sudo_local.template /etc/pam.d/sudo_local
sudo sed -i '' 's/#auth       sufficient     pam_tid.so/auth       sufficient     pam_tid.so/' /etc/pam.d/sudo_local
```

That's it. Your next `sudo` command will prompt for Touch ID instead of a password.

## Why `sudo_local` Instead of Editing `sudo` Directly?

Older guides tell you to edit `/etc/pam.d/sudo` directly. The problem: macOS system updates overwrite that file, and your change disappears. Apple introduced `sudo_local` specifically to solve this. It's a local override that persists across updates.

## What's Actually Happening

PAM is the authentication framework that handles `sudo`. The `pam_tid.so` module bridges PAM to the Secure Enclave, which is the hardware chip that stores your fingerprint data. When you run a `sudo` command:

1. PAM checks `sudo_local` first (because it's included from the main `sudo` config)
2. The `pam_tid.so` module triggers the Touch ID prompt
3. The Secure Enclave verifies your fingerprint locally on-device
4. If it matches, `sudo` proceeds. No password needed

The `sufficient` keyword means Touch ID is enough on its own. If it fails (say you hit Cancel), PAM falls through to the next method, your password, so you're never locked out.

## A Small Thing That Adds Up

This is the kind of micro-optimization that seems trivial in isolation but compounds over a day of terminal work. Every `sudo` that used to break your flow with a password prompt now takes a tap. Once you've used it for a week, you'll wonder why you didn't set it up sooner.
