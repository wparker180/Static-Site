# Static Site with HTML, CSS, JavaScript, and simple Node libraries

A simple static site generator that converts Markdown files to HTML pages.

## Project Structure

```
public/           # Static assets (CSS, JS, images)
src/
  layouts/       # HTML templates
  content/       # Markdown files for pages and blog posts
  scripts/       # Node.js build scripts
dist/            # Generated HTML files
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the site:
```bash
npm run build
```

## Development

- Add Markdown files to `src/content/`
  - Pages go in `src/content/pages/`
  - Blog posts go in `src/content/blog/`
- HTML templates go in `src/layouts/`
- CSS and JavaScript files go in `public/`

## Features

1. ✅ Simple landing page
2. ✅ Blog post template
3. ✅ Markdown -> HTML converter
4. 📝 ConvertKit integration
5. 📝 Contact form
