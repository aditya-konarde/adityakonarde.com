---
title: "Provisioning Dashboards with Grafana"
date: 2020-03-06T23:06:55+01:00
description: "How to provision Grafana dashboards on Kubernetes using GitOps, ConfigMaps, and folder organization for a stateless setup"
tags: ["grafana", "kubernetes", "gitops", "monitoring", "devops", "observability"]
author: "Aditya Konarde"
draft: false
showToc: true
TocOpen: false
hidemeta: false
comments: false
canonicalURL: ""
searchHidden: false
---

## Background

Grafana has become the de-facto visualization tool for Prometheus. While it is cool to run a central Grafana hooked up to an RDS database, I think it is even better if you can make Grafana completely configurable via git and thus have stateless Grafana instances which you can scale horizontally.

Based on this philosophy, I have been running a Grafana setup at Red Hat, here's some key points:

- Grafana runs as pods on a Kubernetes (OpenShift) cluster
- Each dashboard is mounted into the pod via ConfigMap
- Our GitOps pipeline takes care of adding the dashboard configmaps into the namespace, so all dashboards and their changes ultimately must end up in Git

One of the best benefits of this approach is that you never have to worry about Grafana upgrades/downgrades. Because the pods are stateless, you can simply roll out a new version as long as the dashboard schema stays consistent.

## The how

For this exercise, we use a feature in Grafana called Provisioning

Provisioning allows you to inject certain configuration such as dashboards, plugins and notifiers into Grafana via a config file, and Grafana will know to load them at startup (and in the case of dashboards, watch them for updates).

## Provisioning Challenges: Too many dashboards on the main page

So once you discover the awesome technique of dashboard provisioning, you are likely to read the documentation and start with a configuration that looks like the following:

```yaml
apiVersion: v1
data:
  dashboards.yaml: |-
    {
        "apiVersion": 1,
        "providers": [
            {
                "folder": "",
                "name": "0",
                "options": {
                    "path": "/grafana-dashboard-definitions/0"
                },
                "orgId": 1,
                "type": "file"
            }
        ]
    }
kind: ConfigMap
metadata:
  name: grafana-dashboards
```

And the dashboards will be mounted as a volume in the Kubernetes deployment spec:

```yaml
          - mountPath: /grafana-dashboard-definitions/0/grafana-dashboard-foo
            name: grafana-dashboard-foo

            - configMap:
                defaultMode: 420
                name: grafana-dashboard-foo
            name: grafana-dashboard-foo
```

And soon as you add more dashboards, you will have corresponding Volumemounts under the same paths. At some point, your `/dashboards` page has a few dozen dashboards and it is a challenge trying to quickly get to the relevant ones

## Provisioning dashboards into their own folders

In the spirit of keeping our workspace hygenic, I wanted to clean up the mess that the `/dashboards` page was. I wasn't very sure if the documentation around provisioning already provided a way to group dashboards into a folder, so I had given up on that.

But the good news is, you actually can, in two simple steps:

1. Add another folder to the providers in your grafana dashboards config, like so:

```yaml
apiVersion: v1
data:
dashboards.yaml: |-
    {
        "apiVersion": 1,
        "providers": [
            {
                "folder": "",
                "name": "0",
                "options": {
                    "path": "/grafana-dashboard-definitions/0"
                },
                "orgId": 1,
                "type": "file"
            },
            {
                "folder": "Bar",
                "name": "0",
                "options": {
                    "path": "/grafana-dashboard-definitions/Bar"
                },
                "orgId": 1,
                "type": "file"
            }
        ]
    }
kind: ConfigMap
metadata:
name: grafana-dashboards
```

1. When mounting the configmaps, mount them under a path listed in providers:

```yaml
          - mountPath: /grafana-dashboard-definitions/0/grafana-dashboard-foo
            name: grafana-dashboard-foo
          - mountPath: /grafana-dashboard-definitions/Bar/grafana-dashboard-bar
            name: grafana-dashboard-bar

            - configMap:
                defaultMode: 420
                name: grafana-dashboard-foo
            name: grafana-dashboard-foo
            - configMap:
                defaultMode: 420
                name: grafana-dashboard-bar
            name: grafana-dashboard-bar

```

> Note: Any dashboards which are not under any of the paths in providers will just disappear. Also, I would recommend you at least always have the `/0/` path available for General dashboards

And that's a win! now your dashboards will be grouped by folders on the `/dashboards` page, making it super easy for teams to get to them in the time of need.

## Grafana on Kubernetes: Quick Start

I was only able to discover this because [Frederic](https://twitter.com/fredbrancz?lang=en) mentioned that someone added this feature to his repo.

Only later I found that this repo is a gold mine. Not only it allows you to easily generate dashboards from jsonnet and create a ready-to-deploy configuration from it, but it also comes enabled with the folder-wise provisioning we talked about in this blog post.

If you're not already running Grafana this way on Kubernetes, I would highly recommend giving this repo a try: <https://github.com/brancz/kubernetes-grafana>

Some documentation for further reading:

- <https://grafana.com/docs/grafana/latest/administration/provisioning/>
- <https://github.com/brancz/kubernetes-grafana>
- <https://grafana.com/blog/2020/02/26/how-to-configure-grafana-as-code/>
