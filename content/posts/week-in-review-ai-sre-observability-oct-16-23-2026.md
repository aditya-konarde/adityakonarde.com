---
title: "Week in Review: AI, SRE & Observability — October 16–23, 2026"
date: 2026-10-23
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "Reflection releases Beam under Apache 2.0, DeepSeek swaps the model behind deepseek-flash, a generator fault takes out a Google Cloud London zone, and OpenTelemetry allows behavior-changing security fixes in minor releases."
author: "Aditya Konarde"
showToc: true
TocOpen: true
---

<!-- markdownlint-disable-next-line MD025 -->
# Week in review: AI, SRE & Observability

Both big incidents this week grew past their first fault. A power failure in one Google Cloud London zone degraded the whole region, and a cache disconnect at GitHub became a retry storm. In each case a safeguard existed and didn't act.

## AI & machine learning

**Reflection releases Beam 1.0 under Apache 2.0.** Beam, released 2026-10-16, is a 501B-parameter mixture-of-experts model with 23B active parameters and a 1M-token context. The NVFP4 checkpoint is 273 GiB, and Reflection's serving guide targets four NVIDIA B300 GPUs.
[Source](https://reflection.ai/blog/beam-is-available)

**DeepSeek swaps the model behind `deepseek-flash`.** On 2026-10-17 the alias moved to DeepSeek-V4.1-Flash-1017, with MIT-licensed [weights](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017). DeepSeek reports Terminal-Bench 4.0 rising from 31.2 to 42.3. The retired `deepseek-v4-flash` names now route to the new model, so if you pinned one for evals, your baseline moved.
[Source](https://api-docs.deepseek.com/updates)

## Site reliability engineering

**A generator fault took out a Google Cloud London zone.** On 2026-10-20 a grid disruption hit europe-west2-b, and both primary and backup PLCs failed to start the generators. Servers died when the UPS batteries ran out. The preliminary report says zones a and c also degraded: failover traffic exhausted their capacity, and control-plane calls waited on the dead zone. Impact lasted 6 hours 10 minutes.
[Source](https://status.cloud.google.com/incidents/Xs2XTHzAVC9YnafnPyzj)

**GitHub's connection limit was in shadow mode during a retry storm.** On 2026-10-19 an Actions service lost connections to cache servers in one cloud region. Every server reconnected at once and saturated a shared network link. Of jobs on GitHub-hosted runners, 5.13% started late. The limit was logging only; GitHub now enforces it and is adding retry backoff.
[Source](https://www.githubstatus.com/incidents/8tzbpcnl75jp)

## Observability

**OpenTelemetry lets security fixes change behavior in minor releases.** Under a policy published 2026-10-22, stable SDKs and Contrib components can change defaults or reject previously accepted input even in a patch release when a security fix needs it. Public API signatures stay protected. Read OTel patch notes before rolling out: a new attribute limit can truncate what reaches your dashboards.
[Source](https://opentelemetry.io/blog/2026/security-versioning-policy/)

**Grafana makes Watchers and Agent Observability GA.** At ObservabilityCON on 2026-10-20, Grafana Labs made Assistant Watchers generally available: agents that learn telemetry baselines from a plain-language description and send findings through Grafana Alerting. Agent Observability, which traces LLM agents over OpenTelemetry, also went GA.
[Source](https://grafana.com/press/2026/10/20/observabilitycon-2026-ai-updates/)

## Quick links

- Hetzner's vSwitch MAC-learning fault dropped packets between servers from 2026-10-19 to 2026-10-21 ([status](https://status.hetzner.com/incident/10c63641-a480-458e-aee2-e6656a78d2f4), [Magic Pages postmortem](https://www.magicpages.co/blog/post-mortem-on-20-october-2026-outage/)).
- Payaca restored its database in Google's Paris region after in-region failover stalled ([report](https://payaca.com/uk/blog/post-incident-report-20-october-2026-outage)).
- OpenTelemetry eBPF Instrumentation [v1.0.0-rc.2](https://github.com/open-telemetry/opentelemetry-ebpf-instrumentation/releases/tag/v1.0.0-rc.2) moves the Collector receiver into its own Go module.
- Mistral's [Voxtral 3](https://mistral.ai/news/voxtral-3/) speech models cover 50+ languages; the 4B Mini transcriber costs $0.0035 per minute.
- Pennsylvania will require labels on AI-generated ads starting 60 days after the 2026-10-22 signing ([CBS Pittsburgh](https://www.cbsnews.com/pittsburgh/news/pennsylvania-disclosures-ai-generated-ads/)).

## My take

Google's surviving zones degraded on capacity and on calls to the dead zone. So zone redundancy is a capacity claim, and you haven't tested it until you've drained a zone under load.

See you next Friday.
