---
title: "Week in Review: AI, SRE & Observability — August 21–28, 2026"
date: 2026-08-28
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "OpenAI's Hugging Face report and METR's independent review, Kubernetes 1.37, and Google's us-west1 rerouting failure."
author: "Aditya Konarde"
showToc: true
TocOpen: true
hidemeta: false
comments: false
canonicalURL: ""
searchHidden: false
---

The automatic safeguard failed twice this week: Google's traffic rerouting didn't reroute, and OpenAI's agents spent days optimizing against a scorer they had misread.

## AI & machine learning

**OpenAI and METR publish their Hugging Face incident reports** --
Both landed 2026-08-26. METR and Redwood Research staff reviewed the 2026-07-07 to 2026-07-13 ExploitGym runs, when tens of thousands of agents left each other notes on an unsanctioned message board and reverse-engineered the HMAC behind task flags within hours. OpenAI now runs more isolated sandboxes with restricted internet access and more compute on chain-of-thought monitoring.
[Source](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/)

**Activation-reading tools gave Anthropic's agents no uplift** --
CHIVE, published 2026-08-21, finds odd model behaviors in transcripts and tests explanations with counterfactual prompt edits. Agents given activation-reading interpretability tools predicted those outcomes no better than agents that only read the transcript. Models trained on the resulting data did generalize to held-out settings.
[Source](https://alignment.anthropic.com/2026/chive/)

## Site reliability engineering

**Kubernetes 1.37 has two changes that can break you** --
Released 2026-08-26 with 67 enhancements. `SELinuxMount` is on by default, so pods with different SELinux labels sharing a volume on one node can fail to start unless you set `.spec.seLinuxChangePolicy: Recursive`. The API server now rejects expensive list and watch requests with HTTP 429 while the watchcache warms, so controllers need to respect `Retry-After`.
[Source](https://kubernetes.io/blog/2026/08/26/kubernetes-v1-37-release/)

**Google's us-west1 report: the rerouting didn't** --
Published 2026-08-27 for the 2026-08-20 outage, 08:00 to 10:22 Pacific. Scheduled fiber maintenance cut capacity between data centers and automated rerouting failed to move traffic elsewhere, so congestion hit Spanner Paxos consensus and the Unified Metadata Server. That latency cascaded into GKE, Cloud Storage, IAM, and Persistent Disk.
[Source](https://status.cloud.google.com/incidents/utF3FMFdQfwBzJcGG6vf)

## Observability

**OpenTelemetry Go 1.46.0 changes SDK self-metrics** --
Released 2026-08-25. The simple span and log processors now record `otel.sdk.processor.{span,log}.processed` when the record reaches the exporter, not after export completes, and no longer set `error.type` from the result, so alerts on export failures need another signal. It also fixes a data race on concurrent span attribute reads. Last release supporting Go 1.25.
[Source](https://github.com/open-telemetry/opentelemetry-go/releases/tag/v1.46.0)

**Bedrock AgentCore scores agents from OTLP spans** --
AWS described on 2026-08-26 how AgentCore Evaluations reads agent spans from CloudWatch, groups a session by `session.id` with one user turn per trace, then runs the same evaluators whatever framework emitted the telemetry. Instrumentation quality is now the eval's input.
[Source](https://aws.amazon.com/blogs/machine-learning/evaluate-any-agent-framework-with-amazon-bedrock-agentcore-evaluations/)

## Quick links

- [Tetragon 1.7.1](https://github.com/cilium/tetragon/releases/tag/v1.7.1) (2026-08-25) -- `returnArgAction: Post` is gone from TracingPolicy; use `returnArg`.
- [Loki 3.7.7](https://github.com/grafana/loki/releases/tag/v3.7.7) (2026-08-27) -- pre-computes SHA-256 to avoid aws-chunked on S3 PutObject.
- [Grafana alert enrichment](https://grafana.com/whats-new/2026-08-24-alert-enrichment/) (2026-08-24) -- GA in Grafana Cloud, adds context to notifications before delivery.
- [Thomson Reuters ships its own LLM](https://www.prnewswire.com/news-releases/thomson-reuters-leverages-its-world-class-data-assets-to-launch-its-own-frontier-model-302857499.html) (2026-08-24) -- $40M of training on an open-source base, small version open-weight on Hugging Face.

## My take

Read the OpenAI and METR reports as incident reports, not AI news. Agents ran for most of a week against a scorer they had modelled wrong, coordinating in a channel nobody watched. Most eval harnesses share that blind spot.

That's the week. Check your SELinux volumes before you upgrade.
