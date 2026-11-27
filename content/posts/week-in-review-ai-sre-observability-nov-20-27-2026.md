---
title: "Week in Review: AI, SRE & Observability — November 20–27, 2026"
date: 2026-11-27
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "Civo takes every public cloud region offline for 13 hours, Grafana patches three CVEs that have no advisories, Z.ai loops 28 layers in GLM-5.4, and Collector contrib v0.166.0 redacts secrets in 26 breaking changes."
author: "Aditya Konarde"
showToc: true
TocOpen: true
---

Two of this week's stories are about what operators weren't told. Grafana shipped fixes under CVE IDs with no published records, and Civo's status page said "network issue" until its final update.

## AI & machine learning

**Z.ai releases GLM-5.4, a looped 750B model.** Released 2026-11-23, it runs 28 layers of the GLM-5 base twice; the second pass reuses the first pass's sparse KV, so the extra loop costs one sliding window of cache. In a 30B iso-parameter test, Z.ai reports 10–14% shorter outputs for about 10% more training compute. The API waits on a security assessment.
[Source](https://z.ai/blog/glm-5.4)

**ShellBench finds the model matters more than the harness.** The 2026-11-24 paper ran 12 models through 5 agent harnesses, 53,100 rollouts on 100 everyday tasks. Harnesses spanned only 42.9 to 45.2 pass@1, and GPT-6.1 Sol passed 61.4% of attempts at a sixth of GPT-6 Astra's token cost (62.5%). Several authors maintain OpenClaw, the top harness.
[Source](https://arxiv.org/abs/2611.32946)

## Site reliability engineering

**Civo was down in every region for 13 hours.** From 06:35 UTC on 2026-11-21 customers couldn't reach workloads or the API. The 20:00 update blamed precautionary measures against "exceptional suspicious network activity" and said Civo's platform wasn't compromised. Customer CTF7 [rebuilt on AWS](https://ctf7.com/blog/ctf7-outage-incident-report-november-2026/) in about 85 minutes.
[Source](https://status.civo.com/issues/2026-11-21-network-issue-all-regions/)

**Deribit's messaging layer halted trading twice.** On 2026-11-20 a messaging overload starved risk-check services, which failed and tripped an automatic halt at 16:09 UTC. Trading resumed at 16:34, stopped again at 19:13, and fully returned at 22:21 after a core restart and manual database resync. There's no root cause yet.
[Source](https://insights.deribit.com/exchange-updates/a-postmortem-of-our-november-20-2026-derivatives-trading-outage/)

## Observability

**Grafana patches three CVEs with no advisories.** On 2026-11-24 Grafana shipped five patch releases from 12.4.16 to 13.3.2 whose notes list only CVE IDs. [Tech Stackups read the diffs](https://techstackups.com/articles/grafana-november-2026-security-release/): the unauthenticated login page decrypted any ciphertext the instance produced if sent in the `login_error` cookie. Upgrade, and rotate stored credentials if a database copy ever left your control.
[Source](https://github.com/grafana/grafana/releases/tag/v13.3.2)

**Collector contrib v0.166.0 needs a careful upgrade.** Released 2026-11-24, it has 26 breaking changes that make credential options redact in printed configs. The Elasticsearch exporter now retries client timeouts and most 4xx/5xx bulk responses; set both retry lists to `[429]` for the old behavior. Disabling the Prometheus exporter's `DisableAddMetricSuffixes` gate now fails startup.
[Source](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.166.0)

## Quick links

- [Kubernetes v1.38](https://kubernetes.io/blog/2026/11/23/kubernetes-v1-38-sneak-peek/) will require container runtimes to report their cgroup driver.
- DeepMind's [Humanity's First Exam](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/humanitys-first-exam/) checks whether models answer 544 elementary prompts correctly every time.
- [llama.cpp v1.1.0](https://github.com/ggml-org/llama.cpp/releases/tag/v1.1.0) deprecates `llama_batch` for `llama_batch_ext`.
- JetBrains' [Mellum2.1 Instruct](https://blog.jetbrains.com/ai/2026/11/mellum2-1-instruct-is-out-bringing-faster-answers-for-coding-agents/) emits about half the tokens of its Thinking sibling on agentic tasks.
- Collector core [v0.166.0](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.166.0) can replace invalid UTF-8 in OTLP requests behind a feature gate.

## My take

CTF7's report is the useful one. Its recovery worked because its code lived outside Civo; its backups didn't, and it lists that as a failure. If your restore path runs through the provider that's down, you don't have one.

See you next Friday.
