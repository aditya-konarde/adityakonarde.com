---
title: "My Multi-LLM Development Workflow: Leveraging Different AI Models"
date: 2025-11-01
description: "How I leverage multiple AI models including GitHub Copilot, Claude, Deepseek, and Phi-3 for different development tasks and contexts"
tags: ["ai", "llm", "cursor", "copilot", "deepseek", "developer-productivity", "workflow"]
author: "Aditya Konarde"
showToc: true
TocOpen: false
hidemeta: false
comments: false
---

After I switched to engineering management, I realized that I missed coding. With my new job, I spend more time on github, and innovation is very much encouraged at the company. As such, I've been fiddling around with LLM's to see what works (and not).

As I explore various models and learn more, I've developed a workflow that leverages multiple LLMs, each chosen for its specific strengths.

Here's how I use various AI models to boost my development productivity.

## Work projects: Github Copilot with Claude Sonnet v3.5

For work things, GitHub Copilot is my primary assistant for several reasons:

1. **Security**: I don't want to use my personal LLM for work things, plus my company already has a subscription for Copilot.
2. **Team Consistency**: Entire team using the same model ensures consistent suggestions

I primarily use Copilot for:

- Quick code completions during active development
- Documentation generation
- Repetitive code pattern implementation

I also sometimes use the OpenAI models, but I'm not a big fan of those.

## Cursor with Multiple Models for Personal Projects

For personal projects, I use Cursor as my primary IDE with two different models. The subscription is a tad bit expensive, so I'll see how it goes.

### Claude Sonnet v3.5

- **Use Case**: Best coding model so far. Using this to bootstrap my personal projects.
- **Strengths**:
  - Good at understanding context
  - Excellent for completing partial code
  - Decent context window
  - Agent mode, MCP, and other neat features.
- **Weaknesses**:
  - Still slow for many use cases
  - Expensive, limited usage either with cursor or direct API with openrouter

## Roo-cline with Deepseek v3

Deepseek v3 is my go-to model for fast and cheap iterations. It does sometimes get lost, but it's quite nice alongside Claude.

**Specific Strengths**:

- Great at understanding complex codebases
- Great at suggesting optimizations
- Feels faster than claude sonnet v3.5

**Weaknesses**:

- Decent context window size, sometimes is a limiting factor as the codebase gets large
- Sometimes gets lost in the codebase. Needs to be prompted to stay focused

## Local Phi-3 Setup with Continue

I'm currently setting up a local setup using Continue with Phi-3.

1. **Offline Capabilities**:
   - Works without internet connection
   - No token limits or API costs

2. **Use Cases**:
   - Quick syntax checks
   - Documentation / Markdown edits
   - A better search and replace :)

3. **Weaknesses**:
   - You can only get so much out of it compared to the other two models
   - Performance limitations as I'm using an M2 Pro Mac mini, which neither has the best GPU for the job, nor the most RAM (16GB)

## Workflow Integration

Here's how I typically combine these tools in my daily workflow:

1. **Initial Development**:
   - Get started: Use Copilot at work / Cursor with Claude Sonnet v3.5 for personal projects
   - Agent mode to move forward quickly. personal projects are not production critical, so I don't mind going YOLO
      - Commit along the way for checkpoints where things work, and then go crazy with the generation. I think I can do better with some prompt engineering here.

2. **Code Review**:
   - Run Deepseek v3 through roo-cline for deep analysis
   - Use local Phi-3 for quick syntax and style checks

3. **Documentation**:
   - Deepseek v3 for technical details
   - Local Phi-3 for quick doc updates

## Benefits of Multi-LLM Approach

1. Toolbox approach: Each model is used for what it does best
2. Redundancy: Not dependent on a single service, also using openrouter to be able to switch between models
3. Cost Efficiency: Use expensive models only when needed

## Conclusion

While it might seem complex to juggle multiple LLMs, for me the benefits far outweigh the initial setup complexity. Each model brings its unique strengths (and weaknesses), and learning when to use which tool has significantly improved my development workflow.

In the coming weeks, I plan to explore a multi-agent setup.

I'm curious to hear how others are using LLMs in their workflows. What tools do you use? What are your favorite models? Let's discuss on [LinkedIn](https://www.linkedin.com/in/aditya-konarde/)
