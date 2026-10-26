# abkarianlaw.com · Website mockup (Linen & Oxblood)

Clickable mockup prepared by Melti Agency for Abkarian Law Group. Upload this folder as-is.

## Put it on GitHub Pages
1. Upload the whole `abkarianlaw-linen` folder to the repo (drag it into GitHub's "Add file → Upload files").
2. Settings → Pages → Deploy from a branch → `main` → `/ (root)` (or `/docs` if the repo uses that) → Save.
3. The mockup opens at `https://<account>.github.io/<repo>/abkarianlaw-linen/`.

**Keep the four mockup folders side by side** in the same parent folder
(`abkarianlaw-champagne`, `themoldattorney-champagne`, `abkarianlaw-linen`, `themoldattorney-linen`).
The two sites in each color link to each other through those folder names, for example
"Toxic Mold" on abkarianlaw opens `../themoldattorney-linen/index.html`.

## What's in it
- `assets/img/team/`: the team headshots, with the backgrounds changed to match this color direction
- `assets/img/badges/`: the award seals, upscaled with the white backgrounds removed (trust bar under the hero)
- `assets/img/press/`: Forbes, Newsweek, Spectrum and Paramount+ logos in one color ("Recognized by")
- `assets/img/`: the AI-generated photos of Albert (How we can help, CTA background, blog image), the team photo, and Albert's portrait

## Hero video
The hero plays a background loop generated on Higgsfield. It currently streams from Higgsfield's file host:
https://d8j0ntlcm91z4.cloudfront.net/user_3HABkXuvSGosDpzBLDTNF3P8oKH/hf_20261026_021755_68d3d925-51b8-43a7-b50d-d5c488df8ccc.mp4
To make the site fully self-contained, download that file, rename it `hero.mp4` and put it in `assets/video/`.
The page tries `assets/video/hero.mp4` first and falls back to the Higgsfield link, so no code change is needed.

## Notes
- Every page has `noindex`, so nothing shows up in Google.
- Body paragraphs are lorem ipsum; headings and subheadings are the planned copy. Text in [brackets] still needs Albert's input.
- Photos of Albert with clients are AI-generated for this mockup. Get Albert's sign-off before any go live,
  and label staged scenes as dramatizations if they are used in advertising.
- Forms are demos and send no data anywhere.
