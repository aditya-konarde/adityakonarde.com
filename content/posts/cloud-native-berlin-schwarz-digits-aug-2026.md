---
title: "Sold Out in Berlin: Cloud Native Berlin at Schwarz Digits"
date: 2026-08-22
description: "Recap of the sold-out August edition of the Regional Kubernetes & Cloud Native Berlin meetup at Schwarz Digits Office: an LLM internals deep dive and a Cluster API provider built with agentic AI."
tags: ["kubernetes", "meetup", "cloud-native", "berlin", "community"]
author: "Aditya Konarde"
showToc: false
TocOpen: false
hidemeta: false
comments: false
canonicalURL: ""
searchHidden: false
---

We sold out the August edition of the Regional Kubernetes & Cloud Native Berlin meetup: 45 seats, gone. Schwarz Digits opened its office on Karl-Liebknecht-Straße to us, and the room was full from doors at 17:00 to the last conversation winding down around 21:00.

Two talks, one break, no filler. Here's what happened.

## From Von Neumann to Transformers

Dr. Stefan Schimanski (NVIDIA) and Sergiusz Urbaniak (Defense Unicorns) opened with "From Von Neumann to Transformers: An Engineer's Guide to What's Actually Inside an LLM." They built the case starting from the IAS machine: John von Neumann's computer at the Institute for Advanced Study, released June 10, 1952, its CPU 1,700 vacuum tubes. That machine now sits in the Smithsonian.

The through-line was that the intuition which scales from an 8086 diagram to a Linux kernel running Kubernetes starts to fail at transformers. Prompts go in, tokens come out, and the middle looks like magic until you open it up: tokenization, embeddings, attention, feed-forward layers, and how information flows through them as a new kind of compute architecture.

![The Von Neumann to Transformers talk at Cloud Native Berlin, hosted by Schwarz Digits](/images/meetup-berlin-aug-2026/von-neumann-talk.jpg)

## The Venue

Schwarz Digits' office is a glimpse of where European cloud is heading. The wall signage says it plainly: "Ihr europäischer Hyperscaler" -- your European hyperscaler. Their STACKIT platform is the public face of that ambition.

![Schwarz Digits office branding, Cloud Native Berlin August meetup](/images/meetup-berlin-aug-2026/schwarz-digits-venue.jpg)

## A Cluster API Provider with Agentic AI

After a break with pizza, Christoph Voigt took the stage with "Building a Kubernetes Cluster API Provider with Agentic AI: What Actually Changed?" He walked through what it takes to build a Cluster API provider and where agentic AI shifts the work: the boring scaffolding, the deep domain logic, and the parts where a model's suggestions have to be verified against real cluster behavior.

The honest answer to his own title question was refreshing: some things change, and a lot of the hard parts don't. Agents compress the boilerplate but the last mile, like RBAC semantics and reconciliation edge cases, still needs a human who knows the platform.

## Full House

Check-in ran against the RSVP list on a screen at the door. Forty-five people, every seat accounted for.

![RSVP check-in list at Cloud Native Berlin, August meetup](/images/meetup-berlin-aug-2026/rsvp-checkin.jpg)

## Thanks and What's Next

None of this happens without the people who put it together. Thanks to Schwarz Digits for the space, to our long-time sponsors [avodaq](https://www.avodaq.com), [CAST AI](https://cast.ai), and [Dynatrace](https://www.dynatrace.com), and to everyone who showed up and asked good questions.

The September edition is in the works -- venue and CFP incoming. The [Cloud Native Berlin group](https://ocgroups.dev/cncf/group/7qtkpm8) has 365 members now, and if August is any indication, the next one will sell out too. Join the group and we'll see you there.
