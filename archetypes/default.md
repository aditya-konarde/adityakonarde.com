---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true

# Table of Contents
toc: true
toc_sticky: true
toc_label: "Contents"

# Cover image
cover:
  image: "images/cover.jpg" # Path to your cover image
  alt: "Cover image" # Alternative text
  caption: "" # Optional caption
  relative: false # When using page bundles set this to true
---
