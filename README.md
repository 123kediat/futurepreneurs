# Futurepreneurs — E-Cell TIU

Single-page website for the Futurepreneurs Entrepreneurship Cell, Techno India University.

---

## ❓ FAQ — Quick answers

### Q: How do I merge the PR into `main`?

The pull request is currently a **draft**. Follow these steps:

1. Go to the **[Pull requests tab](https://github.com/123kediat/futurepreneurs/pulls)** on GitHub and open the draft PR.
2. Scroll to the bottom and click **"Ready for review"** — this takes it out of draft mode.
3. Click **"Merge pull request"** → **"Confirm merge"**.

That's it! GitHub Actions will immediately start deploying your site to GitHub Pages.

---

### Q: Where is the CNAME file? How do I edit it?

The `CNAME` file lives at the **root of the repository**. You can find and edit it directly on GitHub:

1. Open your repository on GitHub.
2. Click on the file **`CNAME`** in the file list.
3. Click the ✏️ **pencil (Edit) icon** in the top-right corner.
4. Replace `yourdomain.com` with your actual domain and click **"Commit changes"**.

> **Tip:** After the PR is merged into `main`, you can also use this direct link
> (replace `123kediat/futurepreneurs` with your repo if it differs):
> `https://github.com/123kediat/futurepreneurs/edit/main/CNAME`

The file currently contains the placeholder `yourdomain.com` — replace it with the domain you own
(e.g. `futurepreneurs.in`). You get a domain name from a registrar like GoDaddy, Namecheap, or
Google Domains — it is **not** provided by GitHub. See **Step 2** below for full DNS setup.

---

## 🚀 Hosting on GitHub Pages (free)

### Step 1 — Enable GitHub Pages in repository settings

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages** (left sidebar).
3. Under **Source**, select **GitHub Actions**.
4. Click **Save**.

The included workflow (`.github/workflows/deploy.yml`) will automatically build and deploy the site every time you push to the `main` branch.

---

### Step 2 — Connect your custom domain

#### 2a. Update the CNAME file

Replace the placeholder in the `CNAME` file with your actual domain, e.g.:

```
futurepreneurs.in
```

or a subdomain like:

```
ecell.youruniversity.edu
```

Commit and push the change — GitHub Pages reads this file automatically.

#### 2b. Add DNS records with your domain registrar

Log in to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.) and add the following records:

**For an apex/root domain** (e.g. `futurepreneurs.in`), add four **A records**:

| Type | Name | Value          |
|------|------|----------------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

**For a subdomain** (e.g. `ecell.youruniversity.edu`), add a **CNAME record**:

| Type  | Name  | Value                          |
|-------|-------|-------------------------------|
| CNAME | ecell | 123kediat.github.io            |

> DNS changes can take up to 48 hours to propagate.

#### 2c. Enable HTTPS

Once GitHub detects your domain (usually within a few minutes after DNS propagates):

1. Go to **Settings → Pages**.
2. Tick **Enforce HTTPS**.

Your site will then be served securely at `https://yourdomain.com`.

---

## 📁 Repository structure

```
index.html   ← Full website (single-page)
CNAME        ← Your custom domain (edit this)
.github/
  workflows/
    deploy.yml   ← Auto-deploy to GitHub Pages
```
