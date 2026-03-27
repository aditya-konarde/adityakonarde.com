---
title: "Week in Review: AI, SRE & Observability -- March 20-27, 2026"
date: 2026-03-27
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "KubeCon Europe dominated the week with GPU donations, in-place pod resizing going stable, and OTel profiling hitting alpha -- while AI labs shipped new models and Grafana patched a critical RCE."
author: "Aditya Konarde"
showToc: true
TocOpen: true
hidemeta: false
comments: false
canonicalURL: ""
searchHidden: false
---

This was KubeCon week, and it showed. Amsterdam became the center of gravity for cloud-native infrastructure, with announcements ranging from NVIDIA donating its GPU DRA driver to the CNCF, to Kubernetes 1.35's in-place pod resize graduating to stable. Meanwhile, the AI world kept shipping -- Google dropped Gemini 3.1 Flash Live, MiniMax open-sourced a massive hybrid-attention reasoning model, and OpenTelemetry quietly cemented profiling as the fourth observability signal. It was one of those weeks where you could feel the industry shifting under your feet.

## AI and Machine Learning

**Google launches Gemini 3.1 Flash Live for real-time audio AI** --
Google released Gemini 3.1 Flash Live, its highest-quality audio model designed for natural, low-latency voice interactions. The model improves precision in real-time dialogue and is available through the Gemini Live API in Google AI Studio. Developers can build voice agents that handle complex tasks more reliably, and all audio output is watermarked to combat misinformation. This is a clear signal that the voice-agent space is heating up fast.
[Source](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-live/)

**MiniMax open-sources M1, a hybrid-attention reasoning model with 1M token context** --
MiniMax released M1, which they call the first open-source, large-scale, hybrid-attention reasoning model. The standout feature is a 1 million token context window -- matching Gemini 2.5 Pro and 8x larger than DeepSeek R1. The model uses a proprietary Lightning Attention mechanism that requires roughly 30% of the compute of DeepSeek R1 for deep reasoning tasks. For teams doing long-context work at scale, this changes the cost equation significantly.
[Source](https://www.minimax.io/news/minimaxm1)

**NVIDIA unveils Nemotron 3 agentic model stack at GTC 2026** --
NVIDIA introduced its Nemotron 3 family at GTC, a coordinated set of models designed to work together as a unified agentic stack. This includes Nemotron 3 Super (a hybrid MoE model activating 12B parameters per pass for long-context reasoning), along with specialized models for content safety, voice chat, and multimodal RAG. The approach of shipping purpose-built models that compose into an agentic system, rather than one monolithic model, is an interesting architectural bet.
[Source](https://developer.nvidia.com/blog/building-nvidia-nemotron-3-agents-for-reasoning-multimodal-rag-voice-and-safety/)

**OpenAI's GPT-5.3 Instant continues rolling out with measurable hallucination reduction** --
While the initial launch was on March 3, GPT-5.3 Instant continued its wider rollout this month as the default ChatGPT model. The key numbers: 26.8% fewer hallucinations with web search, 19.7% fewer without. OpenAI was unusually candid about the previous model's tone problems, acknowledging it could "feel cringe." The model is now available on both ChatGPT and the API, with Thinking and Pro variants expected soon.
[Source](https://venturebeat.com/orchestration/gpt-5-3-instant-cuts-hallucinations-by-26-8-as-openai-shifts-focus-from)

## Site Reliability Engineering

**NVIDIA donates GPU DRA driver to CNCF at KubeCon Europe** --
The biggest KubeCon announcement: NVIDIA is donating its Dynamic Resource Allocation (DRA) Driver for GPUs to the CNCF, moving it from vendor-governed to full community ownership under the Kubernetes project. This is a watershed moment for AI infrastructure on Kubernetes. GPU scheduling has been the wild west of specialized tooling and vendor lock-in -- having a standardized, community-maintained driver changes the game for anyone running ML workloads on K8s. NVIDIA also introduced GPU support for Kata Containers for confidential computing.
[Source](https://blogs.nvidia.com/blog/nvidia-at-kubecon-2026/)

**Kubernetes 1.35 in-place pod resize graduates to stable** --
After six years and four release cycles, in-place pod resource resize is finally stable in Kubernetes 1.35. The kubelet now applies CPU and memory changes directly through the cgroup layer while the container keeps running -- no restart required. This removes the "restart tax" that has made Vertical Pod Autoscaler impractical for stateful workloads like PostgreSQL, Redis, and Kafka. Platform teams that shelved VPA can now revisit it seriously.
[Source](https://www.rack2cloud.com/kubernetes-1-35-in-place-pod-resize-production/)

**Broadcom donates Velero to CNCF Sandbox, ships VKS 3.6** --
Broadcom moved Velero, the widely-used Kubernetes backup and migration tool, into the CNCF Sandbox for vendor-neutral governance. Alongside this, they shipped vSphere Kubernetes Service 3.6 with Kubernetes 1.35 support, RHEL 9 compatibility, and declarative performance tuning via TuneD profiles. The Velero donation is particularly significant -- it's one of those projects that many teams depend on but worried about single-vendor control.
[Source](https://thenewstack.io/broadcom-velero-cncf-kubernetes/)

**SUSE launches agentic AI platform for Kubernetes operations** --
SUSE announced that Rancher Prime is evolving into what they call the industry's first context-aware Agentic AI Ecosystem at KubeCon EU. Their AI Assistant "Liz" expands into a crew of specialized agents for Linux, observability, security, provisioning, and fleet management. While "AI for Kubernetes ops" is becoming a crowded space, SUSE's approach of embedding agents directly into the platform management layer rather than bolting them on is worth watching.
[Source](https://www.suse.com/c/kubecon-eu-2026-first-agentic-ecosystem-platform/)

## Observability

**OpenTelemetry Profiles signal enters alpha -- profiling becomes the fourth pillar** --
The OpenTelemetry Profiles signal has officially reached public alpha, establishing profiling as the fourth observability signal alongside logs, metrics, and traces. Elastic donated its eBPF-based continuous profiling agent to OTel, which provides whole-system visibility across applications and runtimes with minimal overhead. For SREs and developers, this means you can now correlate performance bottlenecks with traces and metrics in a single, vendor-neutral pipeline. This is a big deal.
[Source](https://www.elastic.co/observability-labs/blog/otel-profiling-alpha)

**Google Cloud goes all-in on OpenTelemetry for metrics ingestion** --
Google Cloud now supports OTLP format for metrics alongside traces and logs in Cloud Monitoring, completing their observability stack's OpenTelemetry integration. The update includes delta-type metrics, exponential histograms, and expanded naming conventions. Google has been methodically rebuilding its observability stack around OTel since September 2025 -- deprecating proprietary agents and pointing developers to OTel packages. When a hyperscaler makes this kind of commitment, the signal is clear: OTel is the standard.
[Source](https://www.infoq.com/news/2026/03/google-cloud-opentelemetry/)

**Grafana patches critical RCE vulnerability (CVE-2026-27876)** --
Grafana released version 12.4.2 along with patches for versions 12.3, 12.2, 12.1, and 11.6 to fix a critical security vulnerability scored at CVSS 9.1. The SQL expressions feature permitted writing arbitrary files to the filesystem, enabling remote code execution with just Viewer-level permissions. If you run Grafana with SQL expressions enabled, patch immediately. Grafana Cloud and major managed providers (Amazon Managed Grafana, Azure Managed Grafana) have already been patched.
[Source](https://grafana.com/blog/grafana-security-release-critical-and-high-severity-security-fixes-for-cve-2026-27876-and-cve-2026-27880)

**OTTL context inference lands in the OpenTelemetry Filter Processor** --
Starting with collector-contrib v0.146.0, the OpenTelemetry Filter Processor supports context inference through new top-level config fields: `trace_conditions`, `metric_conditions`, `log_conditions`, and `profile_conditions`. This removes the need to manually organize filtering rules into OTTL context blocks. It's a quality-of-life improvement that makes Collector configurations significantly less error-prone, especially for teams managing complex filtering pipelines.
[Source](https://opentelemetry.io/blog/2026/ottl-context-inference-come-to-filterprocessor/)

## Quick Links

- **Grafana Cloud Attribution Alerts GA** -- Set alerts scoped to specific teams, services, and environments using cost attribution labels. [Grafana Labs](https://grafana.com/whats-new/2026-03-25-attribution-alerts/)
- **CiliumCon at KubeCon EU** -- Cilium 1.19 sessions covered flow aggregation, scaling Tetragon policies, and replacing legacy hardware load balancers. Cilium celebrates 10 years since first commit. [CNCF Blog](https://www.cncf.io/blog/2026/03/18/kubecon-cloudnativecon-europe-2026-co-located-event-deep-dive-ciliumcon/)
- **AWS pledges $3M in cloud credits to CNCF for 2026** -- Sustaining open source infrastructure that powers the Kubernetes community. [AWS Containers Blog](https://aws.amazon.com/blogs/containers/aws-at-kubecon-eu-2026-open-source-leadership-meets-production-innovation/)
- **Microsoft at KubeCon EU** -- Updates across multi-cluster operations, networking, observability, storage, and cluster lifecycle. [Microsoft Open Source Blog](https://opensource.microsoft.com/blog/2026/03/24/whats-new-with-microsoft-in-open-source-and-kubernetes-at-kubecon-cloudnativecon-europe-2026/)
- **OpAMP for managing OpenTelemetry at scale** -- The Open Agent Management Protocol provides standardized remote management for OTel Collector fleets. [Dotan Horovits on Medium](https://medium.com/@horovits/operating-opentelemetry-at-scale-with-opamp-737b6af8222b)
- **Crossplane sessions at KubeCon EU** -- End-user stories from major financial institutions and global tech companies on API-driven infrastructure and self-healing platforms. [Crossplane Blog](https://blog.crossplane.io/meet-crossplane-in-amsterdam-for-kubecon-eu-2026/)

## My Take

The thread running through this week is standardization eating the world. NVIDIA donating the GPU DRA driver, Google rebuilding its observability stack on OpenTelemetry, Broadcom handing Velero to the CNCF, OTel Profiles reaching alpha -- these are all moves toward shared, community-owned interfaces replacing proprietary ones.

What makes this moment different from previous "open standard" waves is that it's happening simultaneously across AI infrastructure, reliability tooling, and observability. GPU scheduling is getting standardized just as the compute demands of AI workloads are exploding. Profiling is becoming a first-class OTel signal just as teams need deeper visibility into AI inference costs. Kubernetes in-place resize is going stable just as stateful AI workloads make restart-free resource adjustment critical.

The organizations that will move fastest aren't the ones with the biggest budgets -- they're the ones that bet early on these open standards and built their platforms around composable, vendor-neutral tooling. If you're still running proprietary agents, locked into a single observability vendor, or manually managing GPU resources, this was the week that the gap between you and the leaders got measurably wider.

---

Thanks for reading this week's roundup. If something here caught your eye or I missed a story you think deserves attention, I'd love to hear about it -- reach out on [LinkedIn](https://www.linkedin.com/in/adityakonarde/). See you next week.
