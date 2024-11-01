---
title: "Alertmanager Deployment Patterns"
date: 2020-02-03T22:08:20+01:00
description: "A comprehensive guide to different deployment patterns for Prometheus Alertmanager, from single instance to high availability configurations"
tags: ["prometheus", "alertmanager", "monitoring", "devops", "high-availability"]
author: "Aditya Konarde"
showToc: true
TocOpen: true
draft: true
hidemeta: false
comments: false
canonicalURL: ""
searchHidden: false
weight: 1
---

This is a quick knowledge sharing post before it gets out of my head :)

I'm sure many (if not most) of you use Alertmanager as the go-to alerting system with Prometheus

I really like the simplicity of Alertmanager's configuration file and how nicely you can plug it into your configuration generation.

The deployment pattern, however, is always a confusion for new adopters. I am going to try to solve some of that confusion in this post.

## One Alertmanager to rule them all

You start with one Prometheus and a corresponding Alertmanager. The alerting flow looks like this:

Prometheus -> Alertmanager -> Slack

This is where life is simple.

Next, you add some HA to your Prometheus instance. No problems here either

Prometheus 1 and 2 -> Alertmanager -> Slack

Oh, but you indeed also need HA for your alerting system:

Prometheus 1 and 2 -> Alertmanager 1,2,3 -> Slack

At this stage, you have introduced a new alertmanager functionality, which is Gossip. Some of the interesting defaults for this protocol can be found here: https://github.com/prometheus/alertmanager/blob/master/cluster/cluster.go#L98-L106

It is important to note that for this trick to work, each Prometheus individually must fire its alerts to *all* Alertmanagers

