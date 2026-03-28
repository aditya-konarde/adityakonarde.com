---
title: "Week in Review: AI, SRE & Observability — March 7–13, 2026"
date: 2026-03-13
description: "NVIDIA ships Nemotron 3 Super for agentic AI, Grafana Labs inks a five-year AWS deal, Honeycomb goes GA on metrics with MCP integrations, and Kubernetes v1.36 previews HPA scale-to-zero."
tags: ["ai", "sre", "observability", "weekly-roundup"]
author: "Aditya Konarde"
showToc: true
TocOpen: false
hidemeta: false
comments: false
---

This was a week where "agentic" stopped being a buzzword and started showing up in architecture diagrams. NVIDIA dropped a model built specifically for multi-agent workflows, observability vendors raced to give AI agents direct access to production telemetry via MCP, and the cloud-native ecosystem quietly matured with a new CNCF graduation and a Kubernetes release preview that finally lets you scale to zero. If you build, run, or monitor software at scale, there's something here for you.

## 🤖 AI & Machine Learning

### NVIDIA Releases Nemotron 3 Super: A 120B-Parameter Open Model Built for Agentic AI

NVIDIA launched [Nemotron 3 Super](https://blogs.nvidia.com/blog/nemotron-3-super-agentic-ai), a 120B total / 12B active-parameter hybrid Mamba-Transformer MoE model with a native 1M-token context window. The architecture is purpose-built to address two pain points in multi-agent systems: the "context explosion" (agents generating up to 15x more tokens than standard chat) and the "thinking tax" (reasoning at every step being too expensive with large models). It delivers 5x higher throughput than the previous Nemotron Super and ships fully open with weights, datasets, and training recipes. Companies like CodeRabbit, Perplexity, Palantir, and Siemens are already integrating it.

### Thinking Machines Lab Lands Massive NVIDIA Compute Partnership

Mira Murati's year-old startup [Thinking Machines Lab secured a multi-year strategic partnership with NVIDIA](https://www.cnbc.com/2026/03/10/nvidia-mira-murati-thinking-machines-lab-ai.html), including a significant investment and a commitment to deploy at least one gigawatt of next-gen Vera Rubin systems. For context, a facility at that scale could cost around $50 billion. The startup, now valued at over $12B, is focused on customizable AI models rather than another chatbot play. This is one of the clearest signals yet that the "next wave" of AI labs are competing on infrastructure access as much as model quality.

### Google Ships TensorFlow 2.21 with LiteRT Going Production

[TensorFlow 2.21](https://developers.googleblog.com/whats-new-in-tensorflow-221/) officially graduates LiteRT from preview to production, replacing TFLite as the universal on-device inference framework. Key numbers: 1.4x faster GPU performance than TFLite, new NPU acceleration, and first-class PyTorch/JAX model conversion support. If you're deploying models to edge devices, this is a meaningful upgrade path. The addition of lower-precision data types (int8, int16, INT4) across multiple operators is also worth noting for efficiency-conscious teams.

### Databricks Launches Genie Code: Agentic Engineering for Data Work

[Genie Code](https://www.prnewswire.com/news-releases/databricks-launches-genie-code-bringing-agentic-engineering-to-data-work-302711090.html) is Databricks' new autonomous AI agent that handles pipeline building, debugging, dashboard shipping, and production maintenance. On real-world data science tasks, Databricks claims it more than doubled the success rate of leading coding agents. Alongside this, Databricks acquired Quotient AI for continuous evaluation of AI agents. This is the "agentic" pattern applied to data engineering rather than software engineering, and it's a space to watch.

### Anthropic's Pentagon Lawsuit Draws Industry-Wide Support

In a rare show of cross-industry solidarity, [30+ employees from OpenAI and Google DeepMind](https://fortune.com/2026/03/10/google-openai-employees-back-anthropic-legal-fight-military-use-of-ai/) filed an amicus brief supporting Anthropic's lawsuit against the Pentagon's "supply-chain risk" designation. Google chief scientist Jeff Dean is among the signatories. The brief argues the government's action is "an improper and arbitrary use of power." Regardless of where you stand on AI and defense, this is a significant moment for how AI companies relate to government contracting.

## 🔧 Site Reliability Engineering

### Google Publishes How It Applies SRE Principles to Cybersecurity

Google's Cloud team published a detailed blog on [applying SRE to security operations](https://cloud.google.com/transform/how-google-does-it-applying-sre-to-cybersecurity). The core insight is unsurprising but well-articulated: SLOs, error budgets, toil elimination, and blameless retrospectives work just as well for security as they do for reliability. The practical takeaway is that security teams should treat detection-and-response as a software problem with measurable service levels, not a reactive firefighting exercise. Worth reading if your security and SRE teams still operate in silos.

### Kubernetes v1.36 Preview: HPA Scale-to-Zero Finally Enabled by Default

The [Kubernetes v1.36 sneak peek](https://thekubeguy.com/kubernetes-v1-36-sneak-peek-7c5422ffd841) (scheduled for April 22) confirms that `HPAScaleToZero` will be enabled by default after sitting in alpha since v1.16. This means the Horizontal Pod Autoscaler can scale workloads to zero replicas when there's no traffic, then scale back up on demand. If you're running staging, test, or intermittent workloads, this is real cost savings without Knative-style complexity. The release also includes improvements to ephemeral storage and topology-aware scheduling.

### CNCF Graduates Dragonfly for P2P Image and Model Distribution

[Dragonfly reached CNCF graduated status](https://www.infoq.com/news/2026/03/cncf-dragonfly-graduation/), the highest maturity level in the CNCF project lifecycle. Originally open-sourced by Alibaba, Dragonfly uses peer-to-peer acceleration for distributing container images, OCI artifacts, and AI models at scale. Production deployments report image pull times dropping from minutes to seconds and up to 90% savings in storage bandwidth. With GenAI models getting larger by the month, having efficient distribution infrastructure is increasingly a reliability concern, not just an optimization.

### Cloudflare, Azure, and TikTok Outages Share a Common Root Cause

An analysis piece on the [early 2026 outages across Cloudflare, Azure, and TikTok](https://medium.com/beyond-localhost/cloudflare-azure-and-tiktok-all-broke-in-early-2026-the-sres-saw-it-coming-and-nobody-listened-6ea20a727ae1) highlights a pattern that every SRE should internalize: a single automation action with no blast radius limit caused total propagation before a human could intervene. Three different companies, three different stacks, same architectural flaw. The SREs on those teams reportedly saw the risk. If you have automated workflows that can propagate changes without a ceiling on scope, this is your Monday morning reading.

## 🔭 Observability

### Grafana Labs Signs Five-Year Strategic Collaboration with AWS

[Grafana Labs and AWS signed a strategic collaboration agreement](https://grafana.com/press/2026/03/10/grafana-labs-signs-strategic-collaboration-agreement-with-aws-to-accelerate-open-observability-adoption-at-scale/) to accelerate open observability adoption at scale. The five-year deal deepens technical and go-to-market alignment for Grafana Cloud on AWS, with a focus on AI-driven insights, simplified operations, and marketplace access. For teams already running Grafana on AWS, expect smoother integrations. For the broader market, this is another signal that open observability standards are winning the enterprise.

### Honeycomb Ships GA Metrics and Expands MCP for the Agent Era

[Honeycomb announced GA for its time-series Metrics product](https://www.honeycomb.io/blog/honeycomb-metrics-generally-available) alongside expanded MCP integrations. The pitch is compelling: traditional metrics platforms force you to choose between data completeness and cost by discarding high-cardinality dimensions. Honeycomb Metrics claims to eliminate that tradeoff. The MCP expansion is the more forward-looking move, giving AI coding agents direct access to structured observability data for autonomous debugging. "Observability was built for a world where humans wrote the code and humans read the dashboards. That world is changing fast," said Graham Siener, SVP of Product.

### Datadog MCP Server Goes Generally Available

[Datadog's MCP Server](https://www.apmdigest.com/datadog-launches-mcp-server) hit GA, providing AI agents and development tools direct access to live logs, metrics, and traces from the Datadog platform. Compatible with Claude Code, Cursor, Codex, and GitHub Copilot, the server feeds real-time telemetry into AI workflows under existing RBAC controls. The timing of both Honeycomb and Datadog shipping MCP integrations in the same week isn't coincidental. The observability industry is clearly betting that AI agents will be primary consumers of production data, not just humans staring at dashboards.

### Elastic Donates Its OpenTelemetry PHP Distribution to the OTel Project

[Elastic donated its EDOT PHP distribution](https://www.elastic.co/observability-labs/blog/otel-php-distro-donation) to the OpenTelemetry project, and a first beta is about to ship. The donation addresses a real gap: many production PHP environments are locked down and can't build native extensions during deployment. The OS-package-first approach (deb, rpm, apk) enables zero-code instrumentation without rebuilding production images. PHP still powers a significant portion of the web, and this makes OTel adoption dramatically easier for those teams.

## 🔗 Quick Links

- **Cisco LiveProtect**: [eBPF-powered network infrastructure security](https://blogs.cisco.com/security/cisco-liveprotect-bringing-ebpf-powered-protection-into-network-infrastructure) bringing kernel-level protection to network hardware, not just workloads.
- **Kubernetes Ingress at a turning point**: [Platform teams need to rethink ingress architecture](https://siliconangle.com/2026/03/12/kubernetes-ingress-transition-platform-strategy-thecube-appdevangle/) as the ecosystem shifts toward Kubernetes Gateway API.
- **KubeCon India 2026 schedule announced**: [55 sessions in Mumbai on June 18-19](https://www.cncf.io/announcements/2026/03/10/cncf-unveils-kubecon-cloudnativecon-india-2026-schedule/), with AI, observability, and platform engineering as headline tracks.
- **Running Ray at scale on AKS**: [Microsoft and Anyscale share guidance](https://www.infoq.com/news/2026/03/ray-aks-ai-microsoft/) on multi-cluster GPU orchestration for ML workloads.
- **IBM builds PyTorch-native support for Spyre Accelerator**: [Extending torch.inductor](https://research.ibm.com/blog/pytorch-support-ibm-spyre) for dataflow accelerators with tile-based tensor layouts and scratchpad optimization.
- **Google Cloud Threat Horizons Report**: [Vulnerability exploitation now tops credential abuse](https://cloud.google.com/blog/products/identity-security/cloud-ciso-perspectives-new-threat-horizons-report-highlights-current-cloud-threats) as the primary cloud entry vector at 44.5% of intrusions.
- **CRI-O registry mirror auth with K8s secrets**: [New credential provider](https://www.cncf.io/blog/2026/03/09/registry-mirror-authentication-with-kubernetes-secrets/) enables private mirror authentication using namespace-scoped secrets instead of node-level credentials.

## 💬 My Take

The theme of this week is unmistakable: AI agents are becoming first-class participants in the software lifecycle, and our infrastructure is adapting to accommodate them. NVIDIA builds a model architecture specifically for multi-agent token economics. Datadog and Honeycomb both ship MCP integrations so AI agents can query production telemetry directly. Databricks gives data engineering its own agentic workflow.

But here's what I find most interesting: the reliability and observability layers are evolving in lockstep. The Kubernetes ecosystem is maturing in ways that reduce operational toil (HPA scale-to-zero, Dragonfly for efficient distribution), while observability platforms are pivoting from "dashboards for humans" to "structured data for agents." Google's piece on applying SRE principles to security is a reminder that these foundational ideas, SLOs, error budgets, and blameless culture, are portable across domains. The common thread? Treat operations as a software problem, and increasingly, let software handle the operations.

The early 2026 outage analysis is the cautionary counterpoint: automation without blast radius controls remains one of the fastest paths to a bad day. As we hand more operational agency to AI systems, the guardrails we build around automated actions matter more than ever.

---

*What caught your eye this week? I'd love to hear your thoughts: [LinkedIn](https://www.linkedin.com/in/adityakonarde/).*

*If you found this useful, consider subscribing for weekly roundups covering AI, SRE, and Observability.*
