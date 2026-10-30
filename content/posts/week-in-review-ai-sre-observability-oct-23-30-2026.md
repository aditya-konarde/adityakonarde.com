---
title: "Week in Review: AI, SRE & Observability — October 23–30, 2026"
date: 2026-10-30
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "OpenAI prices GPT-6.1 Terra at $1/$5, Mistral releases Large 4 weights, Cloudflare and GitHub publish handoff postmortems, and OTTL reaches v1."
author: "Aditya Konarde"
showToc: true
TocOpen: true
---

<!-- markdownlint-disable-next-line MD025 -->
# Week in review: AI, SRE & Observability

Two postmortems this week trace back to a handoff that went ahead when it shouldn't have. Cloudflare's inference engine passed a rejected request to decode, and GitHub moved reads to a MySQL cluster that was behind on replication.

## AI & machine learning

**OpenAI releases GPT-6.1 Terra at $1/$5 per million tokens.** Released 2026-10-26 as `gpt-6.1-terra`, it costs half of GPT-6.1 Sol's API price. OpenAI reports 50.3% on Terminal-Bench 4.0 at max reasoning, up from 21.5% for GPT-5.6 Terra, but says Sol and GPT-6 Astra still win on the hardest coding work.
[Source](https://openai.com/index/introducing-gpt-6-1-terra/)

**Mistral releases Large 4 weights.** On 2026-10-29 Mistral published the 1T-parameter MoE (49B active) as [FP8 and NVFP4 checkpoints](https://huggingface.co/blog/mistral-large4) for vLLM and SGLang. The modified MIT license allows commercial use, except that a model-as-a-service business needs a separate license.
[Source](https://mistral.ai/news/mistral-large-4-oss/)

## Site reliability engineering

**Cloudflare's GLM-5.3 deployment served other customers' KV cache.** Between 2026-08-27 and 2026-09-09, 155 Workers AI responses contained data from other customers' requests. The prefill KV pool held 681,280 tokens against a 1,048,576-token context, and SGLang handed over-length prompts to decode as one-token placeholders, so decode read stale pages. The fix is a pool of about 2.04M tokens plus an engine patch that retires rejected requests before KV transfer.
[Source](https://blog.cloudflare.com/kv-cache-exposure-remediation/)

**A cleanup job broke GitHub's MySQL migration.** On 2026-10-27 a gh-ost migration of 7 tables overlapped a job deleting about 59 million App installation records, and replication fell up to an hour behind. From 06:55 to 08:01 UTC, git operations with App server-to-server tokens returned 404 for 1.24% of requests on average. GitHub will now block read cutover when replication delay is high.
[Source](https://www.githubstatus.com/incidents/dnslv7xdl4fj)

## Observability

**OTTL reaches v1.** As of Collector Contrib v0.164.0, OTTL's syntax and standard functions stay backward compatible for all of 1.x. New functions start in the experimental `xottl` module behind the `pkg.ottl.functions.enableExperimental` feature gate.
[Source](https://opentelemetry.io/blog/2026/ottl-v1/)

**The File Log receiver now writes protobuf checkpoints.** From v0.164.0, on the maintainers' benchmark, a 1,000-file checkpoint saves in 3.21 ms instead of 15.38 ms and is about 35% smaller, which matters at the default five saves per second. Old JSON checkpoints are read at startup and rewritten, so read offsets survive the upgrade.
[Source](https://opentelemetry.io/blog/2026/filelog-protobuf-checkpoints/)

## Quick links

- Collector [v0.164.0](https://github.com/open-telemetry/opentelemetry-collector-releases/releases/tag/v0.164.0) adds the `transform` processor and two other Contrib components to the core distribution.
- Kubernetes 1.34 reached end of life on 2026-10-27 ([releases](https://kubernetes.io/releases/)).
- Google's [Gemini 4 Carbon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) scores 88.2% on SEC-bench Pro but is open only to vetted cyber defenders so far.
- Liquid AI's [LFM3](https://www.liquid.ai/blog/lfm3) text model fits in about 1 GB at 4-bit.
- Cloudflare [rebuilt range-request caching](https://blog.cloudflare.com/origin-range-requests/) in Pingora and cut R2 p99 latency in half.

## My take

Both postmortems describe a gate that checked a status flag instead of the data. SGLang asked whether a request had finished, not whether it was rejected, and GitHub's read cutover didn't wait on replica lag. Gate stage handoffs on what moved: tokens transferred, rows replicated.

See you next Friday.
