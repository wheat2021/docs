# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository overview
- This repository is a Mintlify documentation site. The root docs.json defines site navigation and settings. Content pages are authored in MDX under topic folders (for example: ai-tools/, essentials/, snippets/). The API Reference is driven by api-reference/openapi.json and can be supplemented by MDX endpoint pages in api-reference/endpoint/.
- Local development and validation are performed via the Mintlify CLI (mint). Deployment is typically managed by Mintlify’s GitHub App from your Mintlify dashboard and auto-deploys on pushes to the default branch (per README).

Common commands
Prerequisites
- Ensure Node.js is installed.
- Install or update the Mintlify CLI globally:

```
npm i -g mint
# If needed, update to latest
npm i -g mint@latest
# Or update via CLI
mint update
```

Local preview
- Run from the repository root (where docs.json is located):

```
mint dev
# Preview runs at http://localhost:3000
# Customize port if needed
mint dev --port 3333
# Preview a specific auth group if your docs use groups
mint dev --group <groupname>
```

API reference and validations
- Validate your OpenAPI file (use the repo’s api-reference/openapi.json path or a URL):

```
mint openapi-check api-reference/openapi.json
```

Content management helpers
- Check for broken relative links in your docs:

```
mint broken-links
```

- Safely rename a file and auto-update internal references:

```
mint rename <oldFilename> <newFilename>
```

- If migrating endpoint MDX pages to OpenAPI-generated pages (optional, only if you choose to consolidate):

```
mint migrate-mdx
```

Architecture and structure
- docs.json (root): The single source of truth for navigation and high-level settings. Edits here change the sidebar/structure across the site.
- Content (MDX pages): Organized by thematic folders (e.g., ai-tools/, essentials/, snippets/). Each .mdx page maps to a route, and metadata/frontmatter can control page behavior.
- API Reference: api-reference/openapi.json provides the underlying API schema. The api-reference/endpoint/*.mdx files can provide additional narrative or custom examples alongside OpenAPI-driven pages.

Deployment (from README)
- Install the Mintlify GitHub App from your Mintlify dashboard to connect this repo. Changes pushed to the default branch are deployed automatically.

Notes and troubleshooting
- Always run commands from the repository root so the CLI can detect docs.json.
- If the local preview doesn’t match expected behavior, ensure the CLI is current (mint update or npm i -g mint@latest).
- No language linters, test runners, or build scripts are defined in this repo—development is content-first via the Mintlify CLI. If these are later added (e.g., eslint, prettier, unit tests), update this file with the exact commands.
