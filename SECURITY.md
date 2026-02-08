# Security Policy

## About This Repository

This is a personal blog/website built with Hugo. While it primarily contains static content, security vulnerabilities could still impact the site's integrity or expose configuration details.

## Reporting a Vulnerability

If you discover a security issue, please report it responsibly.

### How to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please use one of these methods:
- **GitHub Security Advisories**: [Report a vulnerability](https://github.com/aditya-konarde/adityakonarde.com/security/advisories/new)
- **Email**: Contact the repository owner directly

Include the following information:
- Type of vulnerability
- Location of the affected source code (file, line number)
- Step-by-step instructions to reproduce the issue
- Impact assessment

### Response Timeline

| Action | Timeline |
|--------|----------|
| Acknowledgment | Within 7 days |
| Initial assessment | Within 14 days |
| Fix release | Best effort |

## Scope

**In scope:**
- Hugo configuration and templates
- Custom JavaScript or CSS
- GitHub Actions workflows
- Build/deployment configuration

**Out of scope:**
- The Hugo framework itself (report to [Hugo](https://github.com/gohugoio/hugo))
- Third-party themes (report to theme maintainer)
- Content/blog posts (unless they expose sensitive information)

## Security Best Practices

Contributors should:
- Never commit secrets, API keys, or credentials
- Use environment variables for sensitive configuration
- Keep dependencies updated
- Review changes before merging
