---
title: "Look ma, I made an AI Frankenstein"
date: 2026-01-05
description: "A voice-first, multi-agent AI development workflow using OpenCode, Wispr Flow, and multiple LLMs for faster iteration on side projects"
tags: ["ai", "llm", "opencode", "voice-coding", "developer-tools", "workflow", "claude", "gemini"]
author: "Aditya Konarde"
showToc: true
TocOpen: false
hidemeta: false
comments: false
---

The bottleneck in AI-assisted coding isn't the models—it's the interface. After months of experimenting with various AI-powered development tools, I've landed on a voice-first, multi-agent setup that removes the friction between thought and code.

For context, my primary role is an Engineering Manager. I don't write production code at work, but I build apps on the side and experiment with new AI tooling. The challenge: typing instructions slows down iteration, especially when exploring ideas or debugging complex problems. 

In my [previous post on multi-LLM workflows](/posts/multiple-llm-development-workflow), I described using different AI models for different tasks. 


In this fast-moving world, my bottleneck was typing requests and instructions. Voice interaction removes that friction. Speaking instructions feels more natural than typing them, and it's helped me iterate faster and overcome writer's block when exploring new ideas.

## My Current Open Code Setup

### The Stack

My current employer is quite generous with AI tooling, but I try to keep my personal development tooling separate from work. Here's what I'm running:

- **Terminal**: Warp Terminal serves as my primary interface with built-in AI agent capabilities
- **Voice Input**: System-wide voice dictation integrated with all tools via Wispr Flow
- **Orchids**: A tool for generating full-stack apps. Quite good at UI, at least according to UI-Bench
- **OpenCode**: A CLI/TUI-based IDE similar to Claude Code, but with support for multiple AI models through OpenRouter. The oh-my-opencode plugin extends it with additional model configurations and workflow automation

The other apps are pretty much out-of-the-box, but what's interesting is my multi-model setup for OpenCode.

### The LLM Frankenstein

The debate about which AI model is "best" misses the point. As professionals, we should use the right tool for each job. I've been mixing various LLMs, routing tasks to each model based on its strengths. Here's my current setup:

- **Claude Opus 4.5**: My go-to for complex coding tasks, especially backend engineering and architectural decisions. The quality is unmatched, but cost is the constraint—I use it via OpenRouter API billing, which gets expensive quickly. I reserve it for tasks requiring deep reasoning.
- **Gemini 3 Flash**: Best for long-context exploration, documentation generation, and rapid iteration. Its high tokens-per-second and low latency make it ideal when I need to explore large codebases. The trade-off: weaker tool-calling and coding capabilities compared to Opus.
- **GLM 4.7 (Z.AI)**: Provides practically unlimited tokens at low cost. While quality doesn't match Gemini or Opus, it's perfect for experimentation, simple refactoring, and tasks where I need to iterate without budget concerns.

If you'd like to get the same setup, I provide my OpenCode config in these GitHub gists:
- [OpenCode](https://gist.github.com/aditya-konarde/eef6e5c71d1fa004d2a092d3a221d4ae)
- [Oh-my-OpenCode](https://gist.github.com/aditya-konarde/80c61b6e2178a3d5fcea3fa9a956672e)

## Challenges and Solutions

### Challenge 1: Context Loss in Long-Running Tasks
**Problem**: When using oh-my-opencode, agents sometimes lose track of context during extended sessions. I've noticed this especially with long-running commands (which they don't know to interrupt) or when the LLM's context window gets closer to full. 
**Solution**: Breaking work into smaller, focused sessions helps. Planning mode is another useful approach: you can use Gemini for planning, then switch to Opus for the actual implementation. This pattern reduces context loss while managing costs.

### Challenge 2: Voice Dictation in Shared Spaces
**Problem**: Dictating code instructions feels awkward when others are nearby, and ambient noise can interfere with accuracy.
**Solution**: Using headphones with a directional microphone significantly improves accuracy and reduces self-consciousness. The awkwardness fades once you establish a flow, and most people adapt to speaking code naturally after a few sessions.

### Challenge 3: Cost Management
**Problem**: Running multiple high-quality models simultaneously can get expensive, especially with Opus 4.5.
**Solution**: I use a tiered approach: GLM 4.7 for simple tasks and experimentation (free/low-cost), Gemini Flash for exploration and documentation (moderate cost), and Opus 4.5 only for complex reasoning tasks (high cost). I also configure reasoning effort limits and hard dollar limits in OpenRouter to cap costs on expensive models. This keeps my monthly spend somewhat predictable while maintaining quality where it matters.

## What's Next

This setup is continuously evolving. Here's what I'm exploring:

**Quality-focused agents**: Agents that act as automated reviewers and SREs, catching issues before code reaches production. The Droid CLI from Factory demonstrates this pattern—I want to bring similar capabilities to open-source tooling.

**Proactive agents**: Background agents that suggest improvements unprompted, with automatic review gates before creating pull requests. A friend uses multiple AI agents to review PRs. I'd love to have some agents running 24/7.

**Faster iteration**: Cerebras will soon enable GLM 4.7 in their API, which will provide high-throughput inference. I want to experiment with parallel model execution hitting 1000+ tokens-per-second for rapid iteration cycles.

## Try It Yourself

Want to experiment with this workflow? Start simple:

1. **Enable voice dictation**: On macOS, enable system-wide dictation in System Settings > Keyboard > Dictation. On other platforms, use built-in accessibility features or tools like Wispr Flow.
2. **Install OpenCode**: Follow the installation instructions for OpenCode, then add the oh-my-opencode plugin for multi-model support.
3. **Configure your first model**: Start with a single model (Gemini Flash is a good starting point for cost and quality balance) via OpenRouter.
4. **Try voice-first coding**: Speak your next coding instruction instead of typing. Start with simple tasks to build familiarity.
5. **Expand gradually**: Add additional models as you identify use cases where each excels. At some point, you can look into using Oh-my-OpenCode as a framework.

This setup works because it combines the best of each tool without locking me into a single vendor's ecosystem. Using OpenRouter means I can switch between models with a single configuration change, staying nimble as new models emerge.

The combination of voice input and multi-model routing removes the friction that used to slow down my side projects. I can iterate faster, explore ideas more freely, and maintain code quality without sacrificing flexibility.

---

*What's your experience with voice coding or multi-agent setups? I'd love to hear your thoughts: [LinkedIn](https://www.linkedin.com/in/aditya-konarde/)*

*This post was written with AI assistance—voice-to-text conversion and proofreading. The thoughts and setup are my own.* 