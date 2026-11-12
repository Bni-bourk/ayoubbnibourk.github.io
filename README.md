# Ayoub Bni-Bourk — portfolio

Static site: plain HTML, CSS and JavaScript. No build step, no dependencies.
Works on GitHub Pages as it is.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page and all English text |
| `assets/js/fr.js` | All French text (one line per English text) |
| `assets/css/style.css` | Design. Colours are the variables at the top of the file |
| `assets/js/main.js` | Language switch, theme, animations, PID and tank simulations, contact message |
| `assets/img/` | Photos and badges |
| `CV-Ayoub-Bni-Bourk-EN.pdf`, `CV-Ayoub-Bni-Bourk-FR.pdf` | CVs behind the download buttons |
| `og-image.png` | Preview picture shown when the link is shared (LinkedIn, WhatsApp) |

## Change a text

1. Find the English sentence in `index.html` and edit it.
2. Look at the `data-i18n="..."` name on that element, find the same name in `assets/js/fr.js`, and edit the French.

## Add a project

Copy one `<li class="card case">…</li>` block in the Work section of `index.html`, change the texts,
give its `data-i18n` names new values (for example `c7.t`, `c7.d`) and add those two lines to `assets/js/fr.js`.

## Update the CV

Replace the two PDF files and keep the same file names.

## Domain

The address `https://ayoubbnibourk.com/` is written in `index.html` (canonical, og:url, og:image, JSON-LD),
`sitemap.xml` and `robots.txt`. If the site lives on another domain, search and replace it in those three files.
`CNAME` is the GitHub Pages custom domain file.

## Publish

Replace the content of the `ayoubbnibourk.github.io` repository with these files and push to `main`.

## After changing the CSS or JavaScript

`index.html` loads `style.css`, `fr.js` and `main.js` with a version tag (`?v=5`).
When you change one of those files, raise the number in `index.html` (and in `404.html` for the CSS).
Otherwise visitors can keep an old copy for a while and see a broken mix of old and new.
