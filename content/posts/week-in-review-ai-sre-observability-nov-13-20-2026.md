---
title: "Week in Review: AI, SRE & Observability — November 13–20, 2026"
date: 2026-11-20
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "OpenAI ships GPT-6.2 Astra and Sol, Google prices Gemini 4 Neon at $3 per million input tokens, Microsoft and Revolut publish outage reports, and Sentry starts charting the data it drops."
author: "Aditya Konarde"
showToc: true
TocOpen: true
---

<!-- markdownlint-disable-next-line MD025 -->
# Week in review: AI, SRE & Observability

The two big outage reports this week describe systems that were short on redundancy before anything broke. Revolut ran quorum groups on four of five members, and Microsoft's gateway fleet was nearly 14% down when a months-old bug met a traffic shift.

## AI & machine learning

**OpenAI releases GPT-6.2 Astra and Sol.** Announced 2026-11-17, Astra costs $8/$40 per million input/output tokens, 20% below GPT-6 Astra; Sol keeps GPT-6.1 Sol's prices. OpenAI reports Sol within 0.5 points of Astra on Cognition's FrontierCode 2.0 at about a fifth of the cost.
[Source](https://openai.com/index/introducing-gpt-6-2-astra-sol/)

**Google releases Gemini 4 Neon.** Announced 2026-11-18, it costs $3/$15 per million input/output tokens with a 1M-token context. Google claims a 32% lower cost per task than Gemini 4 Carbon at the default thinking level, so Carbon users have an easy A/B test.
[Source](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/)

## Site reliability engineering

**A July fix caused Microsoft's near-24-hour Exchange Online outage.** It caused lock contention on high-core-count gateway servers that load tests on weaker hardware never hit. On 2026-11-12, Teams traffic shifted onto the primary gateway while nearly 14% of its servers were down, and rerouting spread the load until over 80% stopped responding. Rollback couldn't quickly undo a months-old change, so engineers shipped an update reverting the code path.
[Source (heise)](https://www.heise.de/en/news/Exchange-Online-outage-Latent-bug-in-July-fix-took-down-gateways-11527182.html)

**Revolut's 2026-10-20 outage was a quorum nobody knew was short.** The report, published 2026-11-13, says some five-member coordination groups were down to four after routine server replacements, with no alert. When a Google Cloud London zone lost power, two survivors couldn't form quorum and PostgreSQL failover stalled. Revolut now monitors group membership and failure tolerance.
[Source](https://www.revolut.com/blog/post/20octoutagetechnicaloverview/)

## Observability

**Sentry charts the data it dropped.** Generally available 2026-11-18, a bar under each Explore chart shows what percentage of events, spans, logs and metrics were dropped, grouped by reason. That's the difference between "errors fell" and "we stopped receiving errors."
[Source](https://changelog.sentry.dev/changelog/see-when-and-why-sentry-dropped-your-data/)

**CloudWatch adds network performance monitors for VPCs.** Announced 2026-11-18, they report per-path latency and a network impact score from telemetry AWS already collects, with no agents. A high score points at the AWS network, so you can open a support case instead of profiling your app.
[Source](https://aws.amazon.com/about-aws/whats-new/2026/11/cloudwatch-network-path-monitoring/)

## Quick links

- nginx 1.30.7 and 1.31.9 fix the [nginx2root](https://blog.cloudflare.com/nginx2root/) bugs; CVE-2026-123007 needs only HTTP/2 enabled.
- Kubernetes [plans to remove](https://kubernetes.io/blog/2026/11/16/ipvs-removal/) kube-proxy's `ipvs` backend in 1.40 and recommends `nftables`.
- GKE [in-place Dataplane V2 migration](https://cloud.google.com/blog/products/networking/gke-dataplane-v2-in-place-migration) is in preview for VPC-native clusters on 1.35+.
- [vLLM v0.34.0](https://github.com/vllm-project/vllm/releases/tag/v0.34.0) removes Model Runner V1 and raises the default `--block-size` to 64.
- A GitHub session-renewal bug [signed users out](https://www.githubstatus.com/incidents/m310qbkfm3ww) from 2026-11-05 until a fix on 2026-11-19.
- Anthropic [priced its IPO](https://www.anthropic.com/news/anthropic-prices-initial-public-offering) at $83 per share, listing on Nasdaq as ANT.

## My take

Neither outage started from a healthy system. Export remaining failure tolerance (quorum members you can still lose, spare gateway capacity) as a metric with its own alert, because a cluster at N-1 looks green until the next failure.

See you next Friday.
