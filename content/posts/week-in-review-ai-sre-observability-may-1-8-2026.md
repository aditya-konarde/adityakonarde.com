---
title: "Week in Review: AI, SRE & Observability — May 1–8, 2026"
date: 2026-05-08
tags: ["ai", "sre", "observability", "weekly-roundup"]
description: "Anthropic ties Claude limits to a SpaceX data-center deal, AWS turns its MCP server into a first-class agent runtime, a single bad DNSSEC signature takes down half the German web, and OpenTelemetry's GenAI conventions move into their own repo."
author: "Aditya Konarde"
showToc: true
TocOpen: true
hidemeta: false
comments: false
canonicalURL: ""
searchHidden: false
---

This week the boundary between "AI product" and "infrastructure" stopped being polite about itself. Anthropic announced higher Claude limits in the same breath as a 300 MW deal with SpaceX. AWS turned the Model Context Protocol into a managed AWS service. And a single malformed DNSSEC signature at DENIC quietly knocked Bahn, Spiegel, and Amazon.de off the network for users on validating resolvers — a textbook reminder that the most expensive failure modes are still in the boring layers.

## 🤖 AI & Machine Learning

**Anthropic doubles Claude Code limits and signs a SpaceX compute deal** —
At Code with Claude on May 6, Anthropic doubled Claude Code's five-hour limits for Pro, Max, Team, and seat-based Enterprise plans, removed peak-hour throttling for Pro/Max, and raised API rate limits on Claude Opus — all effective the same day. The reason it could ship the limits is buried in the same announcement: a deal for the full compute capacity of SpaceX's Colossus 1 data center in Memphis, more than 300 MW and 220,000+ NVIDIA GPUs (H100/H200/GB200), coming online within the month. Anthropic also flagged interest in multi-gigawatt orbital compute with SpaceX. Increasingly, "rate limit" is a function of "data-center contract."
[Source](https://www.anthropic.com/news/higher-limits-spacex)

**AWS MCP Server hits GA, ships with the new Agent Toolkit for AWS** —
Also on May 6, AWS announced GA of the AWS MCP Server and the Agent Toolkit for AWS, the official successor to AWS Labs MCP servers and skills. The MCP Server gives coding agents IAM-guarded, CloudTrail-audited access to any AWS service through a single tool, with sandboxed Python execution for multi-step work. The Toolkit ships 40+ curated agent skills across CloudFormation, storage, analytics, serverless, containers, and AI services. No extra charge for the server itself — you pay for the AWS resources your agents consume. This is the first time MCP is sitting alongside IAM, CloudTrail, and CloudWatch as a first-class AWS primitive.
[Source](https://aws.amazon.com/about-aws/whats-new/2026/05/aws-mcp-server/)

**Anthropic releases ten ready-to-run agents for financial services** —
On May 5, Anthropic dropped ten agent templates for the most time-consuming work in finance and insurance — pitchbook drafting, credit memos, KYC screening, month-end close, earnings reviews, valuation review, GL reconciliation. Each ships as a plugin in Claude Cowork and Claude Code and as a cookbook for Claude Managed Agents, packaging skills, connectors, and subagents so teams can deploy in days instead of months. Claude is also now an Excel/PowerPoint/Word add-in, with Outlook coming. Anthropic backs it with a benchmark: Claude Opus 4.7 leads Vals AI's Finance Agent at 64.37%.
[Source](https://www.anthropic.com/news/finance-agents)

**Claude Managed Agents get "dreaming," outcomes-based grading, and multi-agent orchestration** —
On May 7, Anthropic shipped three updates to Claude Managed Agents. *Dreaming* (research preview) is a scheduled, between-session process that reviews past sessions and curates an agent's memory store so it improves over time, with optional human-in-the-loop review. *Outcomes* lets you write a rubric for success — a separate grader in its own context window evaluates the output and tells the agent what to fix on the next pass, with webhook notifications on completion. *Multi-agent orchestration* lets one Claude agent spawn and coordinate others. The pattern is clear: agents are moving from "long chat" to "background workers with feedback loops."
[Source](https://9to5mac.com/2026/05/07/anthropic-updates-claude-managed-agents-with-three-new-features/)

## 🔧 Site Reliability Engineering

**The .de TLD goes SERVFAIL: one bad NSEC3 signature, three hours, millions of domains** —
Around 19:30 UTC on May 5, DENIC — the registry for `.de` — began serving an NSEC3 record with a malformed RRSIG (keytag 33834) for a slice of the `.de` zone. Validating resolvers including Cloudflare 1.1.1.1, Google 8.8.8.8, and Quad9 9.9.9.9 did exactly what DNSSEC tells them to do: rejected the response and returned SERVFAIL. Bahn.de, Spiegel.de, Amazon.de, ZDF, DHL, Sparkassen, Hetzner, Strato, IONOS, GMX, and Web.de were all unreachable for users on validating resolvers; ISPs that hadn't enabled validation were unaffected. DENIC re-signed the affected hash range with a new key (keytag 32911) at 20:15 UTC and declared resolution at 23:34 UTC. UptimeRobot saw .de alert volume hit ~10,000 alerts/minute at peak. The takeaway for anyone running a registry-adjacent service: your signing pipeline is a single point of failure for everything underneath you, and the blast radius is measured in TLDs.
[DENIC status](https://status.denic.de/pages/incident/592577eab611ce1e0d00046f/69fa60ef9d12f5057a974f38) ·
[Cloudflare writeup](https://blog.cloudflare.com/de-tld-outage-dnssec/)

**EKS ships Dynamic Resource Allocation for Elastic Fabric Adapter** —
On May 1, Amazon EKS announced GA support for Kubernetes DRA for Elastic Fabric Adapter (EFA). The new driver — built on upstream DRANET — does topology-aware allocation so inter-node RDMA traffic flows through the EFA interface closest (same PCIe root or device group) to each NVIDIA GPU, Trainium, or Inferentia device on the node, and supports interface sharing across workloads. It's recommended for new EKS clusters on Kubernetes 1.34+ with managed or self-managed node groups; the EFA device plugin stays for Karpenter and EKS Auto Mode. This is exactly the plumbing that turns "GPU pods that happen to talk to each other" into "real distributed training that doesn't trip over its own NIC topology."
[Source](https://aws.amazon.com/about-aws/whats-new/2026/05/kubernetes-dra-elastic-fabric-adapter/)

**AWS IAM finally raises the quotas every platform team at scale has been complaining about** —
On May 5, AWS doubled the maximum quotas on six IAM resources: customer-managed policies per account (5,000 → 10,000), instance profiles (5,000 → 10,000), managed policies per role (20 → 25), role trust policy length (4,096 → 8,192 chars), roles per account (5,000 → 10,000), and OIDC providers per account (100 → 700). If you've ever watched a platform team frantically prune managed policies the day a new BU onboards, you know why this matters. The 7x bump on OIDC providers in particular makes per-repo or per-environment GitHub Actions OIDC trust far more sustainable.
[Source](https://aws.amazon.com/about-aws/whats-new/2026/05/aws-iam-increased-quotas/)

**Discord's 3/25 voice outage postmortem: a fan-out classic** —
Discord engineering's writeup of the March 25 voice/video outage (published April 29) is the on-call reading of the week. A "routine" config change shut down 17% of Discord's session-management servers simultaneously; sessions are the heartbeat of every connected device, and losing them at that scale cascaded into voice routing and produced 3+ hours of "Awaiting Endpoint" errors. The shape is the same as a lot of fan-out outages: an optional dependency treated as mandatory, no mandatory/best-effort classification, and a layer nothing downstream was prepared to lose. Required reading for anyone designing real-time systems.
[Source](https://discord.com/blog/behind-the-scenes-of-the-3-25-26-voice-outage)

## 🔭 Observability

**OpenTelemetry's GenAI semantic conventions move into their own repo** —
On May 5 the OpenTelemetry project created [open-telemetry/semantic-conventions-genai](https://github.com/open-telemetry/semantic-conventions-genai), a dedicated repo for spans, metrics, and events covering GenAI clients, the Model Context Protocol, and provider-specific conventions for OpenAI, Anthropic, Azure AI Inference, and AWS Bedrock. The split lets GenAI conventions evolve at their own velocity (which, given the pace of agent frameworks, is "very fast") while still depending on core semconv via Weaver. With agentic workflows producing nested `chat`, `execute_tool`, and `invoke_workflow` spans across frameworks, having a canonical home for things like `gen_ai.group.id` for ReAct-style iteration grouping is overdue.
[Source](https://github.com/open-telemetry/semantic-conventions-genai)

**OpenTelemetry JS experimental 0.217.0 ships a custom OTLP serializer and config-driven log levels** —
The OTel JS experimental release on May 6 replaced the protobufjs-based OTLP trace serializer with a custom implementation, auto-generated TypeScript types from the stable v1.0.0 declarative-config JSON schema, and started honoring `log_level` in YAML config to wire up the diagnostic console logger. Subtle but important: invalid YAML config now produces a no-op SDK instead of a half-initialized one — exactly the failure mode you want during a deploy regression.
[Source](https://github.com/open-telemetry/opentelemetry-js/releases/tag/experimental%2Fv0.217.0)

**Datadog Reference Tables in Observability Pipelines** —
On May 1, Datadog added Reference Tables to Observability Pipelines, letting teams enrich logs at ingest with dynamically updating context from Snowflake, S3, ServiceNow CMDB, Databricks, and similar systems — instead of duplicating lookups downstream or correlating by hand during investigations. For SOC and platform teams stitching threat-intel feeds and asset inventories into queries by hand, this collapses a real chunk of toil.
[Source](https://www.datadoghq.com/blog/observability-pipelines-reference-tables-log-enrichment/)

**Datadog for Government hits FedRAMP High** —
On May 6, Datadog for Government achieved FedRAMP High certification on US1-FED. Effect: federal agencies and contractors that had to bolt separate tools onto high-impact workloads can now run unified observability and security on the same platform they already use for FedRAMP Moderate systems. Niche announcement, very high impact for the teams it covers.
[Source](https://www.datadoghq.com/blog/datadog-achieves-fedramp-high-certification/)

## 🔗 Quick Links

- **Cloudflare Mesh launches a private fabric for AI agents** — Identity-driven, policy-based access for agents into private databases and staging APIs without VPN spaghetti or public exposure. [FutureIoT](https://futureiot.tech/cloudflare-unveils-secure-private-fabric-for-ai-agents/)
- **EC2 I8ge (Graviton4 + Nitro SSDs) lands in five new regions** — Up to 60% better compute and 75% less storage I/O latency variability vs. Im4gn, in Paris, Bangkok, Hong Kong, Seoul, and Tokyo. [AWS](https://aws.amazon.com/about-aws/whats-new/2026/05/ec2-i8ge-available-new-regions/)
- **EventBridge gets data-plane CloudTrail logging** — `PutEvents` is now logged to CloudTrail, finally giving event buses the same audit story as the rest of the AWS control plane. [AWS](https://aws.amazon.com/about-aws/whats-new/2026/05/amazon-eventbridge-data-aws-cloudtrail/)
- **CloudFront supports WebSockets through VPC origins** — One CloudFront distribution can now front HTTP and WebSocket traffic to ALBs/NLBs/EC2 in private subnets. Real-time apps no longer need a public-subnet origin and a homemade ACL strategy. [AWS](https://aws.amazon.com/about-aws/whats-new/2026/05/amazon-cloudfront-websockets-vpc-origins/)
- **Anthropic, Blackstone, H&F, and Goldman launch a new enterprise AI services company** — Pairs the labs that have the models with the PE/finance shops that have the customers and patience for multi-year deployments (May 4). [Anthropic](https://www.anthropic.com/news)
- **arXiv 2605.02572: "On Training LLMs for Long-Horizon Tasks"** — Isolates horizon length as a training bottleneck and shows horizon reduction stabilizes training and generalizes to longer horizons at inference. ICML 2026. [arXiv](https://arxiv.org/abs/2605.02572)
- **arXiv 2605.00347: "Odysseus"** — VLMs to 100+ turn decision-making via RL using a small CNN critic + positive-advantage filtering, past the 20–30 turn ceiling that dogs GRPO/Reinforce++. [arXiv](https://arxiv.org/abs/2605.00347)
- **Red Hat publishes an eBPF integration overview** — High-level map of how OpenShift, RHEL, and Red Hat networking use eBPF, and the upstream projects Red Hat backports from. [Red Hat Developer](https://developers.redhat.com/articles/2026/05/06/using-ebpf-red-hat-products)

## 💬 My Take

Two stories rhyme this week and they're not the obvious pair. The first is Anthropic announcing higher Claude limits *because* it has 300 MW of new GPU capacity coming online in 30 days. The second is the .de DNSSEC outage, where a single malformed signature at DENIC turned millions of domains into SERVFAIL on every modern validating resolver. Different layers, same lesson: the user-visible properties of the systems we ship — rate limits, p99 latency, "is the site up?" — are increasingly decided by a small number of upstream operators controlling physics, capacity, or trust roots. AI product teams now ship behind data-center contracts. Every web property in Germany shipped behind one cryptographic signature. The leverage is migrating, and so is the blast radius.

The other story I keep coming back to is AWS MCP Server going GA. We've spent 18 months treating MCP as a developer-experience flourish — a nice way to plug Claude or Cursor into a tool. AWS putting MCP behind IAM, CloudTrail, and CloudWatch reframes it as a control plane for agent access to *your* environment. The security review before letting an agent loose changes shape: not "can this LLM be jailbroken?" but "what IAM role is this MCP tool assuming, who audits its calls, and what's the blast radius of an outcomes-graded loop running unattended?" The OTel GenAI semconv split is the observability side of the same coin — you can't govern what you can't trace.

---

Thanks for reading this week's roundup. If something here caught your eye or I missed a story you think deserves attention, I'd love to hear about it — reach out on [LinkedIn](https://www.linkedin.com/in/adityakonarde/). See you next week.
