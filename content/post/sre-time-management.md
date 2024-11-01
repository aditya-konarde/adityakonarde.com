---
title: "How much do SRE's really Code?"
date: 2020-12-28T14:29:04+01:00
draft: false
showToc: true
TocOpen: false
hidemeta: false
comments: false
canonicalURL: ""
searchHidden: false
---

## A quick recap on SRE

Site reliability engineering (SRE) is a discipline that incorporates aspects of software engineering and applies them to infrastructure and operations problems.[1] The main goals are to create scalable and highly reliable software systems. According to Ben Treynor, founder of Google's Site Reliability Team, SRE is "what happens when a software engineer is tasked with what used to be called operations."

^ Source: Wikipedia

## How much time do you spend coding?

I get this question quite often: "How much time do you spend writing code?"

With the rising popularity of the SRE mindset, companies each have their own take on what SRE means, which ends up confusing the average reader.

In an ideal world, SRE's spend no more than 50% of their working time on operations work. SRE teams also strive to minimize their 'toil'.

For example, Google places a 50% cap on the aggregate "ops" work for all SREs—tickets, on-call, manual tasks, etc

Let's look at what an average SRE day looks like:

### Anatomy of an SRE day

There is no such thing as a 'normal' day in the SRE world. My answer to the earlier question is always: "It depends on what problem I am trying to solve". Let's see why:

SRE's are tasked with a lot of responsibilities. Let's pick a few from the Google SRE book's index:

- Monitoring and Alerting
- Eliminating Toil
- On-call and Incident Response
- Configuration Design and Best Practices
- Managing Load

While many of these are software problems, one does not use the same tool to solve all of them. Remember: one should not use a hammer to chop a tree.

Some problem can be solved by writing code, while another can be solved without. Incident response is a critical part of an SRE's job, but doesn't involve code. The same for documentation, architecture reviews, consulting and many other aspects of the role.

It also depends on what 'code' really means for you. Is configuration management considered 'code'? What about something like jsonnet? Is writing BASH or Python scripts considered code? People have various opinions about this, which are outside the scope of this blog.

### The realistic model for SRE time

I currently work with Red Hat as an SRE. Here's what my breakdown looks like:

- 40% Development
- 30% Operations
- 20% Consulting, Documentation, Reviews, Meetings, Training, Research
- 10% Meetings :)

While this may sound much less than ideal, I would like to note that I believe knowledge sharing and collaboration with others are one of the harder software engineering problems, and should be treated as such. Consistency, documentation and 'teaching how to fish' can have a surprisingly good long-term impact, so I love spending time there. This totally depends on your organization.

The breakdown is definitely not set in stone, and one must always be prepared to move things around as per the needs of the business. An SRE team is also not a single person, so a good manager will know to encourage individuals to work on their core areas while also adding a fine balance to this breakdown.

If you would like to know more, feel free to reach out to me on [Twitter](https://twitter.com/aditya_konarde) or [LinkedIn](https://www.linkedin.com/in/adityakonarde/) and I would be happy to write a follow-up to this blog :)

## Further reading

- [Google SRE book](https://sre.google/sre-book)
- [Eliminating Toil Chapter from the Google SRE Workbook](https://sre.google/workbook/eliminating-toil/)
- [Managing SRE load](https://sre.google/workbook/overload/)
