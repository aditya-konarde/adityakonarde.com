#!/bin/bash

# Loop through all markdown files in content/posts
find content/post -name "*.md" -type f | while read -r file; do
    # Create temporary file
    temp_file=$(mktemp)
    
    # Update front matter
    awk '
    BEGIN {front_matter=0; printed=0}
    /^---/ {
        if (front_matter == 0) {
            front_matter=1
            print "---"
            next
        }
    }
    front_matter == 1 {
        if ($0 ~ /^title:/) print $0
        else if ($0 ~ /^date:/) print $0
        else if ($0 ~ /^draft:/) print $0
        else if ($0 ~ /^tags:/) print $0
        else if ($0 ~ /^author:/) print $0
        else if ($0 ~ /^description:/) print $0
        else if ($0 ~ /^---/) {
            if (!printed) {
                print "showToc: true"
                print "TocOpen: false"
                print "hidemeta: false"
                print "comments: false"
                print "canonicalURL: \"\""
                print "searchHidden: false"
                printed=1
            }
            front_matter=0
            print "---"
        }
        next
    }
    { print }
    ' "$file" > "$temp_file"
    
    # Replace original file with updated content
    mv "$temp_file" "$file"
done