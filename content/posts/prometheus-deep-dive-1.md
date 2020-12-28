---
title: "Prometheus Deep Dive - Part 1"
date: 2020-12-28T20:12:20+01:00
draft: false
---

About a year ago, I said on this blog that I would do a Prometheus deep dive series. Life happened and 2020 flew by, but now I am finally getting around to actually doing this. Thank you for the patience :raised_hands:

## Prior art

Instead of starting from scratch, I would like to point to the excellent content that the community has already created. I will try to extend on these and try to avoid redundancy.

If you are not already familiar with Prometheus, here's some content I recommend going through before we dive deeper.

- [GOTO 2019 • An Introduction to Systems & Service Monitoring with Prometheus • Julius Volz](https://www.youtube.com/watch?v=5O1djJ13gRU)
- [Prometheus Overview - Official Documentation](https://prometheus.io/docs/introduction/overview/)

## Prometheus architecture

Now that we are hopefully familiar with the high-level components, let's look at the architecture once again.

![Prometheus Architecture](/static/prometheus-architecture.png)

> Source: [Prometheus documentation - as on 28-Dec-2020](https://prometheus.io/docs/introduction/overview/#architecture)

Quoting directly from the official documentation:

```text
The Prometheus ecosystem consists of multiple components, many of which are optional:

the main Prometheus server which scrapes and stores time series data
client libraries for instrumenting application code
a push gateway for supporting short-lived jobs
special-purpose exporters for services like HAProxy, StatsD, Graphite, etc.
an alertmanager to handle alerts
various support tools
```

Let's kick off this blog series with the most important component: The Prometheus Server

The Prometheus server is arguably the most important component in this ecosystem. I like the no-dependency approach here.

The Prometheus server runs as a single binary with the only dependency being the storage layer on the node. This architecture allows a single Prometheus Server to have less strong dependencies and avoids having to implement synchronization across nodes.

Can you already think of the tradeoffs being made here? Since the Prometheus server depends directly on a single node, it faces some limitations:

- The RAM available to the Prometheus server is capped at the maximum RAM that can be added to a single Node
- If the underlying volume/disk used for Prometheus fills up, Prometheus has no smart mechanism to offload tasks to another server
- If the network link to the node running a Prometheus server has a failure, it will result in a full outage for querying and retrieval of data

There are ways of working around some of these limitations to scale a fleet of Prometheus servers, which we will take a look at in a later section of this blog post.

## Responsibilities of the Prometheus Server

It is easier to think of this as a timeline: Applications (commonly, web services) are instrumented and expose a set of metrics on an HTTP/HTTPS web API endpoint. Prometheus then scrapes these endpoints and retrieves time-series data. This time-series data is stored on-disk by Prometheus, and is used to serve background processing and consumer queries.

At a very high level, a Prometheus Server has four primary responsibilities:

- Data Retrieval
- Data Storage
- Processing Stored data
- Making the Stored data available to consumers

While each of these flows are worthy of several blog posts, we can now go a bit more detail here.

### Data Retrieval

How does Prometheus know where to find these endpoints? And how does Prometheus go about making sure the data is consistent and according to the standards?

Luckily, the Prometheus team created a standard format for exposing these metrics. This inspired a new actual standard known as [OpenMetrics](https://openmetrics.io/)

Prometheus works with time-series data which is exported by the applications on an HTTP web API endpoint. Prometheus has two ways to get a list of targets to scrape metrics from:

- Static configs : A simple static list of targets to be scraped
- Service Discovery : Dynamically generated list of targets using discovery integrations with external providers such as Kubernetes

Once Prometheus has a list of targets to scrape and a scrape configuration for each of the targets, it periodically hits the metrics endpoints on each of these targets. Additionally, Prometheus maintains it's own metrics around scrape success and other scrape metadata

At this point, the retrieved time series data is stored in-memory on the Prometheus server. Brian Brazil created a handy [calculator](https://www.robustperception.io/how-much-ram-does-prometheus-2-x-need-for-cardinality-and-ingestion) to give you an estimate on how much RAM a certain number of time series needs. Note that this is an old post and there have been several improvements to memory usage, so I would need to check with him on the calculator's accuracy :)

### Data Storage

Prometheus cannot store everything in memory

Write ahead log

Writing to disk

Remote storage

### Processing Stored data

PromQL is read-only
Recording rules
Alerting rules
    Sending alerts

### Making the Stored data available to consumers

HTTP query API <-> PromQL engine <-> Storage <-> Disk

![Prometheus Query Lifecycle](/static/prometheus-query-lifecycle.png)

> Source: Björn Rabenstein - Life of a PromQL query - Percona Live 2017

Range queries, Instant queries
Federation API
Remote read

Shoutout to Beorn's talk

## Scaling the Prometheus Server

The usual recommendation for high availability here is to run two such servers and load balance queries across them. In case of multiple servers scraping the same targets, Aggregation and Deduplication at query time are expected to be implemented by an additional layer, such as the Thanos Query component.

Write about systems like Thanos, Cortex etc.

## Further reading

- Blog: [Fabian Reinartz: Writing a Time Series Database from Scratch](https://fabxc.org/tsdb/)
- Blog: [Ganesh Vernekar's Blog Series on the Prometheus TSDB](https://ganeshvernekar.com/blog/prometheus-tsdb-the-head-block)
- Blog: [The RobustPerception Blog](https://www.robustperception.io/blog)

- Book: [Brian Brazil. (2018). Prometheus: Up & Running. O'Reilly Media, Inc.](https://learning.oreilly.com/library/view/prometheus-up/9781492034131/)

- Youtube: [Prometheus Learning Youtube Playlist](https://www.youtube.com/watch?v=5O1djJ13gRU&list=PLZZkOcECFJqO-8oi64la7jGHEWdQZo2nu) : For those who prefer video over text content :)
