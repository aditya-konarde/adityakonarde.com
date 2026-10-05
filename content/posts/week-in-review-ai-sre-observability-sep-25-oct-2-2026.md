---
title: "Week in Review: AI, SRE & Observability — September 25–October 2, 2026"
date: 2026-10-02
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "GPT-6.1 Sol and Claude Sonnet 5.5 ship at the same $2/$10 price, K3s moves system images to GHCR, Openprovider explains a SERVFAIL outage, and Honeycomb makes anomaly detection GA."
author: "Aditya Konarde"
showToc: true
TocOpen: true
---

OpenAI and Anthropic shipped mid-tier models a day apart at the same list price: $2 per million input tokens and $10 per million output. Both SRE stories are about dependencies you may not know you have.

## AI & machine learning

**OpenAI releases GPT-6.1 Sol.** Announced 2026-09-29, it keeps GPT-6 Sol's $2/$10 pricing and halves cached input to $0.10. OpenAI says it matches GPT-6 Astra on DeepSWE v1.1 at about one-fifth the cost. Prompts over 272K input tokens bill at 2x input and 1.5x output for the whole request.
[Source](https://openai.com/index/introducing-gpt-6-1-sol) · [Pricing](https://developers.openai.com/api/docs/models/gpt-6.1-sol)

**Anthropic ships Claude Sonnet 5.5.** Released 2026-09-28 at Sonnet 5's price, it scores 70.6% on Terminal-Bench 4.0 versus 10.3% for Sonnet 5, per Anthropic. It is also the first Sonnet with cyber safeguards and fallbacks, so retest security tooling built on Sonnet.
[Source](https://www.anthropic.com/claude-sonnet-5-5)

## Site reliability engineering

**Openprovider explains why four nameservers failed together.** A 2026-09-29 post covers the 2026-09-02 Premium DNS outage: Sectigo migrated its own domain and dropped the address records for its four nameserver hostnames. Zones and servers were fine, but resolvers returned SERVFAIL. Nameservers under one parent domain fail as one.
[Source](https://www.openprovider.com/blog/when-a-dns-provider-loses-its-own-nameservers-and-gets-back-a-servfail) · [Incident report](https://lp.openprovider.com/hubfs/Premium%20DNS%20outage.pdf)

**K3s moves system images to GHCR in v1.40.** From v1.40, expected July 2027, packaged components such as CoreDNS and Traefik pull from `ghcr.io/k3s-io` instead of `docker.io/rancher`. Default installs need nothing. Clusters using `--system-default-registry`, a `docker.io` mirror in `registries.yaml`, the embedded mirror, or airgap tarballs need changes before upgrading.
[Source](https://docs.k3s.io/blog/2026/10/01/K3s-system-images-ghcr)

## Observability

**Honeycomb makes anomaly detection GA.** Announced 2026-09-29, it learns per-service baselines for error rate and presence with no configuration and opens a Canvas investigation when it fires. AI Ecosystem, in early access, shows failure rate, retries, latency, and estimated cost across agents; the cost uses public list prices, so don't reconcile invoices with it.
[Source](https://www.honeycomb.io/blog/agents-need-context-canvas-connectors-ai-agent-visibility)

**OpenTelemetry measures what instrumentation emits.** A 2026-09-25 post introduces the Ecosystem Explorer, a per-version catalog of Java agent and Collector components, plus conformance runs checked with Weaver's live-check. Across HTTP clients in seven languages, required attributes appeared nearly everywhere; recommended ones did not. Check your library before building dashboards on a recommended attribute.
[Source](https://opentelemetry.io/blog/2026/exploring-instrumentation-ecosystem/)

## Quick links

- OpenAI disrupted a distillation campaign that sent 16,000 reasoning-extraction requests on 2026-07-24 and 2026-07-25. [Source](https://openai.com/index/disrupting-a-coordinated-model-distillation-campaign/)
- OpenAI updated, on 2026-09-25, its report on an RL agent that reached a chatbot through its sandbox DNS resolver. [Source](https://alignment.openai.com/misalignment-reports/an-agent-used-dns-to-reach-an-external-chatbot/)
- Claude.ai, Claude Code, Cowork, and the Claude API returned errors from 14:00 to 14:59 UTC on 2026-09-29. [Source](https://status.claude.com/incidents/4xvtc2gnq73l)
- GitHub Actions lost execution state for some runs around 02:00 UTC on 2026-10-01; retrying approvals won't recover them. [Source](https://www.githubstatus.com/incidents/dqn46wtvbdzv)
- Grafana Cloud now maps knowledge graph entities automatically when you activate an observability solution. [Source](https://grafana.com/whats-new/2026-09-25-knowledge-graph-mapping-activates-automatically-with-observability-solutions/)

## My take

Opinion: two reports this week came back to DNS. Add a synthetic check that runs `dig A` on your DNS provider's nameserver hostnames, and add a `ghcr.io` mirror to K3s before v1.40 forces it.

See you next week.
