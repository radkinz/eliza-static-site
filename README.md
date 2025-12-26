# Eliza (Static GitHub Pages)

This is a static (no-server) version of the Eliza chatbot UI.  
It runs entirely in the browser and can be deployed on GitHub Pages.

## Files
- `index.html` – main page
- `base.css` – styles (from your original project)
- `app.js` – client-side Eliza logic (replaces Flask)

## Deploy on GitHub Pages (recommended: /docs)
1. Create a new GitHub repo (or use your existing one).
2. Put these files in a folder named `docs/`:
   - `docs/index.html`
   - `docs/base.css`
   - `docs/app.js`
3. In GitHub: **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/docs`
4. Visit the URL GitHub gives you.

## Notes
- The original Flask `POST /` endpoint is replaced by client-side JS.
- Dad jokes are fetched from the public `icanhazdadjoke.com` API when you type `joke`.
