---
title: "Week in Review: AI, SRE & Observability — September 18–25, 2026"
date: 2026-09-25
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "Anthropic and OpenAI cut prices on the same day, Cloudflare explains a dm-thin cross-tenant leak in Containers, Prometheus 3.15 adds OpenMetrics 2.0 scraping, and a survey says OTel and Prometheus now mostly get along."
author: "Aditya Konarde"
showToc: true
TocOpen: true
---

The pattern this week is price, not capability. Anthropic and OpenAI shipped cheaper models on the same day, 2026-09-22, and the infrastructure stories are about reclaiming what you already pay for.

## AI & machine learning

**Anthropic releases Claude Opus 5.5.** Announced 2026-09-22 at $4/$20 per million input/output tokens, 20% below Opus 5, with cache reads at $0.20 (60% below). Anthropic reports 66.4% on Terminal-Bench 4.0 versus 57.9% for GPT-6 Astra at about 40% of the cost. Vendor numbers, and Anthropic itself says the gap to Fable 5.1 is narrower in daily use. [Source](https://www.anthropic.com/claude-opus-5-5)

**OpenAI ships GPT-6 Sol and Luna at half price.** Same day, `gpt-6-sol` drops to $2/$10 and `gpt-6-luna` to $0.10/$0.50 per million tokens, 50% below GPT-5.6 promotional pricing. OpenAI reports Sol at 68.8% on DeepSWE v1.1, 1.1 points behind Claude Fable 5, at about 80% lower cost per task. Neither is in Chat yet. [Source](https://openai.com/index/introducing-gpt-6-sol-and-luna/)

## Site reliability engineering

**Cloudflare Containers leaked disk blocks across tenants.** A 2026-09-24 write-up covers a bug reported 2026-09-04: dm-thin pools had `skip_block_zeroing` set, so a 4 KiB write into a reused 64 KiB block left 60 KiB of another customer's data readable via `/dev/vdc`. Researchers found residual data on 20 of 22 nodes. Cloudflare removed the flag, then retired every running disk and cached image snapshot, since zeroing only covers new allocations. [Source](https://blog.cloudflare.com/containers-cross-tenant-vulnerability/)

**Cloudflare cut 100 TB of RAM by shrinking a consistent-hash ring.** Pingora Backend Router used up to 6 GB per process on `pingora-ketama` points. Packing the `{hash: u32, index: u32}` struct into 6 bytes saved 25%; deriving the error formula for k hashes per server showed 90% of the points added nothing measurable. [Source](https://blog.cloudflare.com/saving-100-tb-of-ram-with-math/)

## Observability

**Prometheus 3.15.0 ships OpenMetrics 2.0 scraping.** Released 2026-09-24, it also adds Unix-socket scrape targets, zstd scrape responses behind `zstd-scrape`, runtime `GOMEMLIMIT` re-detection, and log level changes on reload via `runtime.log_level`; `--log.level` is deprecated. XOR2 float chunk encoding is stable, but check that Thanos sidecars and anything else reading TSDB directly support it first. [Source](https://github.com/prometheus/prometheus/releases/tag/v3.15.0)

**OTel and Prometheus interoperability survey: friction down, hybrids everywhere.** Published 2026-09-22 from 81 screened end users: the share calling the two hard to use together fell from 29% in 2024 to 10%. For infrastructure metrics, 72% use Prometheus exporters, 57% use OTel receivers, and nearly half run both. [Source](https://opentelemetry.io/blog/2026/otel-prometheus-interoperability/)

## Quick links

- Honeycomb documents its `adaptive_tail_sampling` Collector processor: first-match rules and thresholds in `ot=th` TraceState. [Source](https://www.honeycomb.io/blog/how-adaptive-tail-sampling-works)
- Kubernetes 1.37.1 fixes a `DeviceTaintRule` with no `deviceSelector` matching every DRA device cluster-wide. [Source](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.37.md#v1371)
- Grafana 13.3 imports Prometheus and Mimir Alertmanager configuration into Grafana Alerting (preview). [Source](https://grafana.com/whats-new/2026-09-21-import-of-alertmanager-configuration-to-grafana-alerting/)
- Lorin Hochstein on GitHub's 2026-09-13 incident: a cleanup job paced by replica lag saturated the primary instead. [Source](https://surfingcomplexity.blog/2026/09/19/saturation-at-github-the-saga-continues/)

## My take

The Cloudflare Containers fix is the one to copy. Flipping `skip_block_zeroing` fixed new allocations, but already-mapped blocks in running disks and image caches stayed dirty, so they rebuilt the fleet. If your mitigation only changes a default, ask what existing state still carries the old behavior.

See you next week.
