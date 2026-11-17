---
title: "Week in Review: AI, SRE & Observability — October 30–November 6, 2026"
date: 2026-11-06
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "OpenAI rates GPT-6 Cyber Critical, GitBook stays offline for 16 hours after a breach, a Redis redial storm degrades GitHub Actions, and OpenTelemetry JS SDK 3.0 drops Node.js 18 and 20."
author: "Aditya Konarde"
showToc: true
TocOpen: true
---

<!-- markdownlint-disable-next-line MD025 -->
# Week in review: AI, SRE & Observability

GitBook's timeline shows an attacker reaching production 76 minutes after hijacking staff sessions. The same week, OpenAI rated its new cyber model Critical under its Preparedness Framework. Both stories are about how little time defenders get once a credential leaks.

## AI & machine learning

**OpenAI releases GPT-6 Cyber.** Announced 2026-11-05, it scores 48.5% on ExploitGym against 32.1% for GPT-5.6 Cyber, and OpenAI researchers used it to write 948 Linux privilege escalation exploits and find 81 high-severity Firefox bugs. OpenAI classifies it Critical for cybersecurity, up from High, and exploit work goes through Daybreak Red.
[Source](https://openai.com/index/introducing-gpt-6-cyber)

**Thinking Machines ships Inkling 2 Small with weights to follow.** Released 2026-11-05, it's a 594B-parameter MoE (17B active) with image input, on Tinker now with closed weights; Apache 2.0 weights are due next week after external red-teaming. The lab's table puts it behind DeepSeek-V4.1-Flash-1017 on DeepSWE v1.1, 72.1% to 77.0%.
[Source](https://thinkingmachines.ai/news/inkling-2-small/)

## Site reliability engineering

**GitBook took itself offline for 16 hours after a breach.** On 2026-11-02 an attacker used an SSO flaw to act as staff, then pulled credentials from a misconfigured GitHub App and reached production with a Cloudflare API key. Disabling the compromised service accounts at 20:32 UTC kept the app down until 11:56 UTC on 2026-11-03 while GitBook rotated every secret it manages. GitBook API users need new tokens.
[Source](https://www.gitbook.com/status/security-incident-2026-11-03)

**A Redis redial storm degraded GitHub Actions.** On 2026-10-30 gateway maintenance between GitHub's data center and Azure Central US Redis made an Actions service redial aggressively, and about 90% of connection attempts failed. Actions and Pages degraded from 17:50 to 18:32 UTC. GitHub has cut retries and is adding jittered backoff and retry budgets.
[Source](https://www.githubstatus.com/incidents/pwxsjgnvrk6b)

## Observability

**OpenTelemetry JS SDK 3.0 drops Node.js 18 and 20.** Released 2026-11-05 as stable v3.0.0 and experimental v0.300.0 packages, it requires Node.js 22.15.0 or later. With logs stable, `@opentelemetry/api-logs` folds into `@opentelemetry/api` and the Jaeger exporter is removed. `auto-instrumentations-node` users don't need changes; 2.x keeps support for a year.
[Source](https://opentelemetry.io/blog/2026/otel-js-sdk-3-0/)

**OpenTelemetry eBPF Instrumentation reaches v1.0.0.** OBI, which started as Grafana's donated Beyla, shipped 1.0 on 2026-10-30 with compatibility commitments for Config v2 and its deployment interfaces. Config v1 still loads but is frozen; `obi config migrate` converts it, and maintainers suggest a canary first.
[Source](https://opentelemetry.io/blog/2026/obi-v1-release/)

## Quick links

- Kubernetes [v1.38.0-beta.0](https://github.com/kubernetes/kubernetes/releases/tag/v1.38.0-beta.0) shipped 2026-11-06; code freeze is 2026-11-16 AoE ([schedule](https://www.kubernetes.dev/resources/release/)).
- Cloudflare [stopped rebuilding whole DNS zones](https://blog.cloudflare.com/dns-targeted-zone-builds/) on setting changes and cut the pipeline's peak memory by 85%.
- Alloy v1.21.0 moves its [OTel engine](https://grafana.com/blog/bridging-alloy-and-opentelemetry-the-otel-engine-is-now-in-public-preview/) to public preview; it runs standard Collector YAML.
- CloudWatch's X-Ray OTLP endpoint now [accepts API keys](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-cloudwatch-api-keys-opentelemetry/) as bearer tokens, an alternative to SigV4.
- Tencent's [Hy4](https://hy.tencent.ai/research/hy4) is the first Hy model with vision and computer use.

## My take

The Redis storm is GitHub's second retry storm in two weeks, after the [2026-10-19 Actions incident](https://www.githubstatus.com/incidents/8tzbpcnl75jp). Both fixes added backoff afterward. Clients without jitter or a retry budget will get tested by routine gateway maintenance.

See you next Friday.
