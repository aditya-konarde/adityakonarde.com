---
title: "Prometheus Deep Dive: Understanding the Fundamentals"
date: 2019-12-31T14:48:44+01:00
description: "An introduction to Prometheus monitoring, its architecture, and why it has become the go-to choice for metrics collection in cloud-native environments"
tags: ["prometheus", "monitoring", "observability", "cloud-native", "devops"]
author: "Aditya Konarde"
draft: false
showToc: true
TocOpen: false
hidemeta: false
comments: false
canonicalURL: ""
searchHidden: false
---

## What is Prometheus

If you're an engineer working with Cloud technologies, chances are that you've already heard of [Prometheus](https://prometheus.io/)

Prometheus is an Open Source monitoring tool. Its development started at [SoundCloud](https://soundcloud.com/pages/contact) and it has now evolved into being a go-to choice for metrics collection. I often relate its rise in popularity to its simple, gitops friendly configuration management, simple setup and modularity.

Prometheus does a few things and does it well. While doing this, it does have some nice modularity as you can mix and match it with other tooling such as [Grafana](https://github.com/grafana/grafana) and [Alertmanager](https://github.com/prometheus/alertmanager).

I don't want to make the first paragraph a clickbait. While it was important to set the context, this is *not* a post that introduces Prometheus itself. Others in the community have done a very good job at doing this, and here's a few recommended talks and blogs about Prometheus if you have some catching up to do.

### Prerequisite reading: A Prometheus crash course

- [Get an overview](https://prometheus.io/docs/introduction/overview/)
- [Understand the architecture](https://www.youtube.com/watch?v=9GMWvFcQjYI)
- [And please get your hands dirty](https://www.katacoda.com/courses/prometheus/)

> Again, note that this is a 'deep dive' series. If you're new to Prometheus, I would highly recommend making sure you're familiar with the terminology first with the material above

## Prometheus: Diving into the fire

When I first started learning to use and set up Prometheus, I faced certain challenges that I don't want other users to see. One of them is the lack of documentation around the details of how Prometheus really works under the hood.

Understanding these core subsystems will help you become a more effective Prometheus operator:

- **The Prometheus Data Model**: How metrics are structured and labeled
- **Life cycle of a scrape**: What happens when Prometheus collects metrics from targets
- **TSDB**: The time series database layer that powers storage and queries
- **Query evaluation**: How PromQL queries are parsed and executed
- **Alerting**: The flow from alert rules to notifications via Alertmanager
- **Service Discovery**: How Prometheus automatically finds scrape targets
- **Self-monitoring**: Using Prometheus to monitor Prometheus itself

For deeper exploration of these topics, I recommend the [Prometheus documentation](https://prometheus.io/docs/introduction/overview/) and the various conference talks from the maintainers.

A special shoutout to everyone who contributes to this project and has given talks or written content around it. The community's knowledge sharing is what makes Prometheus so accessible.

If you'd like to discuss Prometheus or have questions, feel free to reach out on [LinkedIn](https://www.linkedin.com/in/adityakonarde/).
