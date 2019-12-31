---
title: "Prometheus Deep Dive Series: Intro"
date: 2019-12-31T14:48:44+01:00
draft: false
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

When I first started learning to use and set up Prometheus, I faced certain challenges that I don't want other users to see. One of them is the lack of documentation around the details around how Prometheus really works.

The Prometheus project maintainers are busy people, but I'm hoping to talk to them one at a time and write up a post each on the major subsystems of the codebase.

Here's an overview of what I currently think the roadmap for the series is going to be. I may add tweaks to this post as my understanding of the project evolves.

- The Prometheus Data Model
- Life cycle of a scrape
- TSDB - The Prometheus time series database layer
- Prometheus Query evaluation
- Alerting walkthrough
- Service Discovery in Prometheus
- Monitoring Prometheus with Prometheus

And finally here's a disclaimer that I'm not an expert on any of these. I hope to be a gatherer instead, collecting bits of knowledge from everyone's heads and recording it :)

If you have topic suggestions/requests, please let me know on twitter @aditya_konarde

A special shoutout to everyone who contributes to this project and have given talks/written content around the Project. I will try to quote them directly as much as I can, but do note if I miss something, all credits belong to whoever they belong to. I have no claims ;)
