---
title: "Week in Review: AI, SRE & Observability -- April 3-10, 2026"
date: 2026-04-10
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "Open-weight AI models dominated the week as Google shipped Gemma 4 and Meta launched Llama 4, while AWS brought native OTel and PromQL to CloudWatch and the eBPF-over-sidecars movement gained momentum."
author: "Aditya Konarde"
showToc: true
TocOpen: true
hidemeta: false
comments: false
canonicalURL: ""
searchHidden: false
---

This was the week open-weight AI went mainstream. Google and Meta shipped major model families within days of each other -- Gemma 4 with agentic capabilities running on phones, and Llama 4 with a 10-million-token context window running on a single GPU. Meanwhile, AWS quietly dropped one of the most significant observability announcements of the year: native OpenTelemetry metrics and PromQL in CloudWatch. And across the SRE world, the conversation shifted hard toward AI-native infrastructure governance. Buckle up.

## AI and Machine Learning

**Google launches Gemma 4 -- open-weight models with agentic capabilities from phones to data centers** --
Google DeepMind released Gemma 4, a family of four open-weight models (E2B, E4B, 26B MoE, 31B Dense) under an Apache 2.0 license. Built on Gemini 3 research, these models bring native function calling, structured JSON outputs, and vision understanding to hardware ranging from a Raspberry Pi to an H100. The 26B MoE variant activates only 4B parameters per token while delivering frontier-level quality, and Cloudflare already made it available on Workers AI within days. With 400 million cumulative Gemma downloads, Google is making a clear bet: the future of open AI is agentic, multimodal, and runs everywhere.
[Source](https://blog.google/technology/developers/gemma-4/)

**Meta ships Llama 4 Scout and Maverick -- first open-weight multimodal MoE models** --
Meta released Llama 4 Scout (17B active params, 109B total, 16 experts) and Maverick (17B active, 400B total, 128 experts), marking the most significant architectural shift in the Llama family to date. Scout's headline feature is an industry-leading 10-million-token context window -- the longest in any open-weight model -- while fitting on a single H100 GPU. Maverick competes directly with GPT-4o and Gemini 2.0 Flash on benchmarks while using less than half the active parameters. Both models are natively multimodal (text, images, video) and available on Hugging Face.
[Source](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)

**Alibaba restructures AI leadership as CEO takes direct control** --
Alibaba announced a major reshuffle of its AI command structure. CEO Eddie Wu now chairs a new Technology Committee, former Cloud CTO Zhou Jingren becomes Chief AI Architect leading a new standalone Tongyi Large Model Business Unit, and Feifei Li takes over as Alibaba Cloud CTO. The restructuring follows the departure of Qwen chief architect Lin Junyang in March and separates three previously blended layers: CEO-led AI governance, dedicated model development, and cloud infrastructure delivery. This comes alongside the release of Qwen 3.6 Plus, optimized for agentic coding with a 1M-token context window.
[Source](https://www.scmp.com/tech/article/3349428/alibaba-creates-ceo-led-technology-committee-amid-intensifying-ai-race)

**Cloudflare makes Gemma 4 26B available on Workers AI within days of launch** --
Cloudflare partnered with Google to bring the Gemma 4 26B MoE model to Workers AI almost immediately after launch. The model's architecture -- 8 active experts out of 128 total, plus 1 shared expert -- means it runs nearly as fast as a 4B model while delivering quality closer to a 26B dense model. It supports a 256K token context window, built-in thinking mode, vision understanding, and function calling through Cloudflare's standard API endpoints. The speed of this deployment signals how quickly the inference infrastructure ecosystem is maturing around new open models.
[Source](https://developers.cloudflare.com/changelog/post/2026-04-04-gemma-4-26b-a4b-workers-ai/)

## Site Reliability Engineering

**Nirmata launches Cloud Agents -- AI-native Kubernetes governance** --
Nirmata, the company behind the CNCF-graduated Kyverno policy engine, launched Cloud Agents in Nirmata Control Hub. These are deterministic, LLM-powered diagnostic agents that run directly on your clusters with a single click -- no scripts, no setup. Rather than general-purpose AI assistants, Cloud Agents use constrained workflows with AI reasoning layered on top, sitting firmly in the "agents-as-a-service" category. For platform teams managing policy at scale, this is a meaningful evolution from reactive policy enforcement to proactive infrastructure analysis.
[Source](https://nirmata.com/2026/04/02/introducing-cloud-agents/)

**Shadow AI meets admission control -- governing AI agents from code to runtime** --
Also from Nirmata, a compelling approach to a growing problem: uncontrolled AI agents running in production without security or compliance awareness. Their proposal wires together AI Bill of Materials (AIBOM) attestation with Kyverno admission control, so every agent pod must carry a verified capability declaration before being admitted to a cluster. No attestation means no admission. No approved framework means no admission. Undeclared tool access means no admission. As agentic AI workloads proliferate on Kubernetes, this kind of governance-at-admission is going to become table stakes.
[Source](https://nirmata.com/2026/04/05/governing-ai-agents-from-code-to-runtime/)

**Dapr sidecar recovery failure exposes edge case in Kubernetes crash recovery** --
A production incident surfaced where Dapr sidecars failed to recover after repeated Kubernetes cluster crash/recovery cycles caused by OOM pressure. After the cluster stabilized, some sidecars remained stuck with `actorRuntime.hostReady=false`, disconnected placement, and stale scheduler addresses from dead peers -- while the app containers next to them were perfectly healthy. The sidecars returned 500 from the health endpoint but 204 from the outbound check, creating a confusing split-brain state. It's a good reminder that sidecar recovery is one of the hardest problems in distributed systems, and that "the cluster recovered" doesn't mean everything recovered.
[Source](https://github.com/dapr/dapr/issues/9743)

**CNCF publishes hands-on guide to GitOps policy-as-code with Argo CD and Kyverno** --
The CNCF published a detailed walkthrough for deploying Kyverno alongside Argo CD, covering baseline policies from the official Helm chart and custom policy creation. The guide emphasizes that GitOps without guardrails means misconfigured or non-compliant resources can reach production unchecked. For teams already using Argo CD for declarative infrastructure, adding Kyverno as a policy enforcement layer at the admission controller level is a natural extension that keeps everything in Git.
[Source](https://www.cncf.io/blog/2026/04/02/gitops-policy-as-code-securing-kubernetes-with-argo-cd-and-kyverno/)

## Observability

**AWS CloudWatch gets native OpenTelemetry metrics and PromQL -- this is a big deal** --
Amazon CloudWatch now natively ingests OTLP metrics and supports PromQL queries, available in public preview. The new high-cardinality metrics store supports up to 150 labels per metric, and automatic AWS vended metric enrichment means you can correlate custom OTel metrics with infrastructure metrics from 70+ AWS services in a single query. CloudWatch also launched Query Studio, its first native PromQL query environment with autocomplete and visualization. For the many teams that have been running split pipelines -- CloudWatch for AWS metrics, Prometheus for everything else -- this preview eliminates that friction. Free during preview.
[Source](https://aws.amazon.com/blogs/mt/introducing-opentelemetry-promql-support-in-amazon-cloudwatch/)

**Microsoft ships Application Insights Agents View for OTel-instrumented AI agents** --
Azure Application Insights now has a dedicated Agents (Preview) view for monitoring AI agent workloads instrumented with OpenTelemetry GenAI semantic conventions. The view surfaces agent runs, token usage per agent, tool call durations, and LLM call patterns -- all correlated through OTel traces. This is purpose-built for the emerging pattern of multi-agent applications where understanding which agent is consuming the most tokens or taking the longest matters as much as traditional latency and error rate monitoring.
[Source](https://techcommunity.microsoft.com/blog/appsonazureblog/monitor-ai-agents-on-app-service-with-opentelemetry-and-the-new-application-insi/4510023)

**Fluent Bit 5.0.2 adds eBPF VFS tracing and Azure Blob path templating** --
Fluent Bit 5.0.2 shipped with a new `in_ebpf` input plugin that adds VFS (Virtual File System) tracing for container security, alongside Azure Blob path templating that brings parity with the S3 output plugin. The eBPF addition lets you observe file system operations at the kernel level without modifying applications, which is particularly useful for detecting unauthorized file access in container environments. Combined with OAuth hardening improvements, this release reflects Fluent Bit's evolution from a lightweight log forwarder to a serious system-level observability component.
[Source](https://fluentbit.io/announcements/v5.0.2/)

**OpenTelemetry spec adds Process Context OTEP for eBPF profiler integration** --
A new OTEP (OpenTelemetry Enhancement Proposal) landed in the OTel specification for sharing process-level resource attributes with external readers like the eBPF profiler. The mechanism uses Linux anonymous memory mappings so that when an SDK initializes, it publishes resource attributes to a small memory region that external processes can discover and read. This bridges a fundamental gap: eBPF profilers operate outside the instrumented process and previously couldn't access resource attributes configured within OTel SDKs. It's infrastructure plumbing, but it's the kind that makes OTel profiling actually work in practice.
[Source](https://github.com/open-telemetry/opentelemetry-specification/commit/34f27fdc4ad113f26c781b45b8a91542f21413d3)

## Quick Links

- **GitHub Agentic Workflows ships OTLP tracing overhaul (v0.67.1)** -- Accurate span names, OTLP payload sanitization, headers masking, and MCP Gateway OTel integration. [GitHub](https://github.github.com/gh-aw/blog/2026-04-06-weekly-update/)
- **eBPF monitoring replacing sidecars gains momentum** -- Analysis of how Datadog's kernel-level observability with eBPF is making sidecar-based service mesh monitoring increasingly obsolete. [Kunal Ganglani](https://www.kunalganglani.com/blog/ebpf-monitoring-replacing-sidecars)
- **Grafana visualization suggestions now GA** -- Updated suggestions leverage data source metadata for higher-quality chart recommendations. [Grafana Labs](https://grafana.com/whats-new/2026-04-10-updated-visualization-suggestions-now-generally-available/)
- **Azure Container Apps adds Dynamic Sessions for AI agent code execution** -- Sandboxed session pools let agents safely execute AI-generated code on ACA. [Microsoft](https://github.com/microsoft/azure-container-apps/issues/1687)
- **Alibaba releases Qwen 3.6 Plus** -- Optimized for agentic coding with autonomous plan-test-iterate loops and a 1M-token context window. [Alibaba Cloud](https://treasurytoday.com/press-releases/press-release-alibaba-unveils-qwen-3-6-plus-to-accelerate-agentic-ai-deployment-for-enterprises-and-alibabas-ai-applications/)
- **OTel Collector Contrib weekly report** -- 42 new issues including a Datadog exporter bug that silently reports success on log send failures. [GitHub](https://github.com/open-telemetry/opentelemetry-collector-contrib/issues/47401)

## My Take

The pattern this week is unmistakable: open-weight AI and open observability standards are converging, and the infrastructure layer is scrambling to keep up.

Google and Meta releasing major model families within 72 hours of each other -- both open-weight, both MoE, both natively multimodal -- tells you that the competitive moat for AI is no longer model access. It's inference infrastructure, distribution, and ecosystem. Cloudflare having Gemma 4 on Workers AI within days of launch is the proof point: the value is shifting downstream from model training to model deployment. Meanwhile, Alibaba's dramatic leadership restructuring shows what happens when the tension between open-source ideology and commercial pressure reaches a breaking point.

On the observability side, AWS adding native OTel and PromQL to CloudWatch is the kind of quiet announcement that reshapes buying decisions for the next three years. Combined with Microsoft's new Agents View in Application Insights -- purpose-built for OTel-instrumented AI workloads -- every major cloud provider now has a serious OTel story. The eBPF Process Context OTEP landing in the OTel spec is the less flashy but equally important counterpart: it's the plumbing that makes cross-signal correlation actually work when your profiler lives in kernel space and your traces live in userspace.

The teams that will navigate this well are the ones building on open standards (OTel, PromQL, open-weight models) while staying pragmatic about where they run. The infrastructure is finally catching up to the standards.

---

Thanks for reading this week's roundup. If something here caught your eye or I missed a story you think deserves attention, I'd love to hear about it -- reach out on [LinkedIn](https://www.linkedin.com/in/adityakonarde/). See you next week.
