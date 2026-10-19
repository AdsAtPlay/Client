# Client Previews

Website previews (sitemaps, wireframes and mockups) that Melti Agency shares with clients for review.

**Live site:** https://client.adsatplay.com

| Page | Address |
|---|---|
| Client hub | https://client.adsatplay.com/ |
| Abkarian Law Group | https://client.adsatplay.com/Abkarian-Law/ |

> ⚠️ **This repository is public.** Anyone can browse every client folder here on GitHub, and anyone with a link can open the pages. Only put draft layouts and placeholder content here. Never add contracts, pricing, passwords, client personal data or anything a client has asked to keep private.

---

## How the repository is organised

The website lives in `docs/`. Everything outside `docs/`, including this README, stays in the repository but is **not** published on the website.

```
Client/
├── README.md                    ← this file (not published)
└── docs/                        ← everything in here is the website
    ├── CNAME                    ← custom domain; created by GitHub, do not edit or delete
    ├── .nojekyll                ← tells GitHub to publish files as-is; keep it
    ├── index.html               → client.adsatplay.com/
    └── Abkarian-Law/            → client.adsatplay.com/Abkarian-Law/
        ├── index.html           ← the client's review page
        ├── assets/              ← logos and images
        ├── wireframes/          ← clickable HTML wireframes
        │   ├── abkarianlaw-b/
        │   └── themoldattorney-c/
        └── docs/                ← PDFs (sitemaps, wireframe PDFs)
```

`docs/` does not appear in any address. `docs/Abkarian-Law/index.html` is served at `client.adsatplay.com/Abkarian-Law/`.

---

## Adding a new client

1. **Create the folder** inside `docs/`, named after the client, for example `docs/Acme-Dental/`.
   - The folder name becomes the address: `client.adsatplay.com/Acme-Dental/`.
   - Use letters, numbers and hyphens only: no spaces, no `&`, no accents.
   - Capital letters matter. `Acme-Dental` and `acme-dental` are different addresses. Pick one and never rename it after sharing the link.
2. **Add an `index.html`** in that folder. This is the client's review page. Copy `docs/Abkarian-Law/index.html` as a starting point and change the content.
3. **Add the files** in sub-folders: `wireframes/`, `docs/` for PDFs, `assets/` for images.
4. **Link everything with relative paths**, for example `href="wireframes/home.html"` or `href="docs/sitemap.pdf"`, never the full `https://…` address. Relative links keep working if the domain ever changes.
5. **Add a card to the hub** in `docs/index.html`, pointing to `Acme-Dental/`.
6. **Commit and push to `main`.** The site updates in about a minute. Check the Actions tab if it doesn't.
7. **Run the checklist below** before sending the link.

---

## Before you send a link to a client

- [ ] The page opens at `client.adsatplay.com/<Client-Folder>/` with no 404.
- [ ] Every link and PDF on the page opens. Click each one.
- [ ] The page looks right on a phone.
- [ ] Every `<head>` contains `<meta name="robots" content="noindex, nofollow">` so Google doesn't list it.
- [ ] Placeholders are written in `[brackets]`. There are no made-up numbers, reviews or awards.
- [ ] There is nothing confidential in the folder (see the warning at the top).

---

## File rules

- **File names:** lowercase with hyphens, for example `abkarianlaw-wireframe-b.pdf`. Spaces in file names turn into `%20` in links and break easily.
- **Sizes:** GitHub Pages allows about 1 GB for the whole site and 100 MB per file. Compress PDFs and images. Don't upload raw video; link to YouTube or Vimeo instead.
- **Canvas files:** don't upload `.dc.html` files from the design canvas. They don't work outside it. Export a standalone `.html` or a PDF instead.

---

## GitHub Pages settings (for reference)

Already set up. Only touch these if something breaks.

| Setting | Value |
|---|---|
| Settings → Pages → Source | Deploy from a branch: `main`, folder `/docs` |
| Settings → Pages → Custom domain | `client.adsatplay.com` |
| Settings → Pages → Enforce HTTPS | On |
| DNS at the domain registrar | `CNAME` record: `client` → `adsatplay.github.io` |

### If the site shows "There isn't a GitHub Pages site here"

1. Check that `docs/CNAME` exists and contains only `client.adsatplay.com`.
2. Settings → Pages: check that the custom domain still shows `client.adsatplay.com` and the source is `main` / `/docs`.
3. Re-enter the custom domain and save, then wait a few minutes.
4. Check the DNS `CNAME` record still points `client` to `adsatplay.github.io`.

---

Maintained by Melti Agency · contact@meltiagency.com
