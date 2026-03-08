# EscapeReality

Personal project website for the **Escape Reality** outdoor community.

## Overview

EscapeReality is a static multi-page website focused on:
- Outdoor activities and meetups
- Community storytelling through photos and content
- A lightweight contact flow for new participants

The project is built with plain:
- HTML
- CSS
- JavaScript

## Live Pages

- `index.html` - Home / Hero section
- `activities.html` - Activities and participation details
- `events.html` - Event timeline + upcoming event section
- `information.html` - Story + photo gallery (with lightbox)
- `contacts.html` - Contact form + Instagram fallback

## Features

- Modern responsive UI
- Sticky navigation bar
- Mobile navigation menu
- Card-based activity and event layout
- Gallery lightbox (keyboard support: `Esc`, arrow keys)
- Contact form status messaging and fallback behavior
- SEO-friendly meta tags and Open Graph tags

## Project Structure

```text
EscapeReallity-main/
├─ fonts/
├─ images/
├─ index.html
├─ activities.html
├─ events.html
├─ information.html
├─ contacts.html
├─ styles.css
├─ main.js
└─ UPCOMING_UPDATES.md
```

## Run Locally

Because this is a static website, you can run it by opening `index.html` directly in your browser.

For a better local dev experience, use any static server, for example:

```bash
# Python 3
python -m http.server 5500
```

Then open:

`http://localhost:5500`

## Deployment

Current/target hosting workflow:
- GitHub repository as source control
- Hosting via **Vercel** (planned/ongoing)

See [UPCOMING_UPDATES.md](./UPCOMING_UPDATES.md) for next planned improvements.

## Author

Designed and developed by **spandreou**  
GitHub: [https://github.com/spandreou](https://github.com/spandreou)
