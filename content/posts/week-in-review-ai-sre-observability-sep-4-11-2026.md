---
title: "Week in Review: AI, SRE & Observability — September 4–11, 2026"
date: 2026-09-11
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "OpenAI ships GPT-6 Astra and an Agents API, Kubernetes 1.37 moves gang scheduling to beta, Inngest loses a Direct Connect path, and Prometheus 3.13.3 fixes shutdown CPU spins."
author: "Aditya Konarde"
showToc: true
TocOpen: true
---

The pattern this week is vendors selling the harness, not the model. OpenAI put its Codex agent runtime behind an API, Grafana turned on its knowledge graph by default, and Kubernetes moved gang scheduling toward GA.

## AI & machine learning

**OpenAI releases GPT-6 Astra.** Announced 2026-09-10 as `gpt-6-astra` in the API, Azure, and Bedrock. OpenAI reports 98% on FrontierMath Tier 4, 59.3% on Agents' Last Exam (vs. 55.5% for Claude Opus 5), and OSWorld 2.0 tasks in about 47% less time than GPT-5.6 Sol. Vendor numbers, and enterprise access is off by default until an admin enables it. [Source](https://openai.com/index/gpt-6-astra/)

**OpenAI opens the Codex harness as an Agents API.** The public beta, also 2026-09-10, creates a session with a model, MCP tools, subagent limits, and a sandbox in one call. OpenAI hosts the harness; compute runs in an OpenAI sandbox, your infrastructure, or partners such as Cloudflare and Modal. Pricing is tokens and tools only, so the orchestration layer many teams built in-house is now free with usage. [Source](https://openai.com/index/introducing-the-agents-api/)

## Site reliability engineering

**Inngest outage: one Virtual Private Gateway carried the live path.** Function execution was down from 18:13 to 18:48 UTC on 2026-09-04. While wiring a new data center, the team removed a VPG that looked idle but held the active Direct Connect association to AWS-hosted state. Reattaching it didn't restore that association, and every fallback used the same path. [Source](https://www.inngest.com/blog/2026-09-04-incident-report-for-september-4-2026)

**Kubernetes 1.37 promotes workload-aware scheduling to beta.** A 2026-09-08 post covers `Workload` and `PodGroup` at `v1beta1`, gang scheduling, workload-aware preemption, and a new `CompositePodGroup` for driver-plus-workers hierarchies. Breaking bits: `v1alpha2` is gone, `disruptionMode` values changed from `PodGroup`/`Pod` to `all`/`single`, and `minCount` is now mutable. [Source](https://kubernetes.io/blog/2026/09/08/kubernetes-v1-37-advancing-workload-aware-scheduling/)

## Observability

**Grafana Cloud makes the knowledge graph the default.** Since 2026-09-07 new organizations get Application Observability built on the Knowledge Graph instead of the classic plugin, with Host, Kubernetes, and Database Observability on too. Services are discovered from OpenTelemetry data and segmented by `deployment.environment`. Existing customers are unchanged; a migration path is promised later. [Source](https://grafana.com/whats-new/2026-09-07-application-observability-now-includes-the-knowledge-graph-by-default/)

**Prometheus 3.13.3 patches LTS.** Released 2026-09-07, it bumps `klauspost/compress` and `x/crypto` for two Go vulnerabilities and fixes scrape and alerting managers spinning at 100% CPU on shutdown, out-of-order queries blocking compaction, and case-insensitive regex matchers dropping values. If rollouts hit termination timeouts, this is why. [Source](https://github.com/prometheus/prometheus/releases/tag/v3.13.3)

## Quick links

- Kubernetes 1.37 moves `KubeletInUserNamespace` (rootless node components) to beta, on by default. [Source](https://kubernetes.io/blog/2026/09/04/kubernetes-v1-37-rootless-beta/)
- Grafana now proposes availability and latency SLOs for services without one. [Source](https://grafana.com/whats-new/2026-09-10-let-grafana-propose-slos-for-your-service/)
- Grafana Synthetic Monitoring drops the `label_` prefix on custom labels; migrate by 2027-03-01 or get auto-migrated. [Source](https://grafana.com/blog/synthetic-monitoring-labels-update/)
- OpenAI says an internal model beyond Astra produced a Lean-formalized Navier-Stokes finite-time singularity proof. [Source](https://openai.com/index/navier-stokes-solution/)
- Cloudflare R2 returned elevated 503s in Eastern North America for about 3.5 hours on 2026-09-04. [Source](https://www.cloudflarestatus.com/incidents/ftvf8c3m4mv5)

## My take

Inngest lists change control as its first fix, but the finding that matters is the last one: every fallback shared one network path, so redundancy existed on paper only. Test failover by removing the path in staging first.

See you next week.
