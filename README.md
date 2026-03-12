# Futurepreneurs — E-Cell TIU

Single-page website for the Futurepreneurs Entrepreneurship Cell, Techno India University.

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
