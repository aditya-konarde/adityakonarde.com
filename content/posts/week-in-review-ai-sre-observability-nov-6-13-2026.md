---
title: "Week in Review: AI, SRE & Observability — November 6–13, 2026"
date: 2026-11-13
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "Anthropic ships Claude Fable 5.2, Google prices Gemini 4 Hydrogen at $1.50 per million input tokens, a region migration rejects GitHub Actions traffic, and the OpenTelemetry Collector deprecates its batch processor."
author: "Aditya Konarde"
showToc: true
TocOpen: true
---

<!-- markdownlint-disable-next-line MD025 -->
# Week in review: AI, SRE & Observability

GitHub moved a core Actions database to a new cloud region, and that region's rate limits rejected the traffic. Phala served production inference from a GPU server that wasn't fully hardened. Both times, new capacity went live before it was checked like the old capacity.

## AI & machine learning

**Anthropic ships Claude Fable 5.2 and Mythos 5.2.** Released 2026-11-09, they're one model in two configurations: Fable has cyber and biology safeguards and is open to everyone, while Mythos is limited to verified organizations. Both cost $8/$40 per million input/output tokens with a 1M-token context, and Anthropic says output is up to 30% faster than 5.1.
[Source](https://www.anthropic.com/claude-fable-and-mythos-5-2)

**Google releases Gemini 4 Hydrogen.** Announced 2026-11-12, it costs $1.50/$7.50 per million tokens flat across its 1M context and scores 51 on the Artificial Analysis Intelligence Index, one point above Gemini 4 Argon. Google reports Terminal-Bench 4.1 rising from 18.2% on Gemini 3.8 Flash to 57%.
[Source](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)

## Site reliability engineering

**A region migration overloaded GitHub Actions.** On 2026-11-09 from 18:07 to 18:59 UTC, traffic shifted to a newly migrated Actions database exceeded the new region's capacity and rate limits, affecting 28% of workflow runs on average and 65% at peak. GitHub will shift traffic in smaller steps for the remaining migrations. Critical incidents followed on [2026-11-10](https://www.githubstatus.com/incidents/hnf21m9jkl3c) and [2026-11-11](https://www.githubstatus.com/incidents/dvy0t3mvh1lg).
[Source](https://www.githubstatus.com/incidents/tp8cghg7tlc4)

**Phala's breach exposed OpenRouter inference requests.** An attacker chained a legacy internet-facing service to management interfaces that trusted loopback callers without authentication, then took over a GPU server lacking full production hardening. If OpenRouter sent your DeepSeek V4 Flash 0731 requests to Phala between 2026-10-21 and 2026-11-08, rotate any secrets in them.
[Source](https://phala.com/posts/phala-november-preliminary-incident-report)

## Observability

**The OpenTelemetry Collector deprecates the `batch` processor.** Exporter-level batching in `sending_queue` becomes the default in v0.171.0 (planned February 2027), and `batch` is removed in v0.177.0 (May 2027). The new default won't remove `batch` from your pipelines, so do it yourself or switch to the `queue_batch` replacement.
[Source](https://opentelemetry.io/blog/2026/collector-batching-migration/)

**ClickHouse Observability enters public beta.** Announced 2026-11-09, it's a managed OTLP endpoint on ClickHouse Cloud with the ClickStack UI and an MCP server for agents. Logs and traces cost $0.20 per GB and metrics $0.10 per million data points (half during the beta); per-point billing means extra labels add no cardinality charge.
[Source](https://clickhouse.com/blog/announcing-clickhouse-observability)

## Quick links

- Alertmanager [0.35.0](https://github.com/prometheus/alertmanager/releases/tag/v0.35.0) replaces `--enable-feature=auto-gomemlimit` with `--auto-gomemlimit` and rejects unnamed eventrecorder outputs.
- NVIDIA's [NVKE and NVKR](https://developer.nvidia.com/blog/manage-kubernetes-clusters-for-gpu-infrastructure-with-nvidia-kubernetes-engine/) run managed Kubernetes on GPU clusters; both are public preview.
- NVIDIA [contributed OpenShell](https://blogs.nvidia.com/blog/open-source-openshell-infrastructure/), an agent governance runtime, to the CNCF Sandbox.
- EKS Provisioned Control Plane 4XL and 8XL tiers now get a [24 GB etcd database](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-eks-provisioned-control-plane-larger-etcd-database/), up from 16 GB.
- Meta's [Muse Ember](https://research.meta.ai/blog/muse-ember) is its smallest model, built for tool calls and extraction.

## My take

GitHub's fix is cheap to copy: put the target region's rate limits and quotas on the cutover checklist, and move traffic in steps you can roll back. A migration isn't done when the data lands.

See you next Friday.
