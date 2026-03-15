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

The file currently contains `futurepreneurs.social`. Change it only if your domain is different.
See **Step 2** below for full DNS setup.

---

## 🚀 Hosting on GitHub Pages (free)

### Step 1 — Enable GitHub Pages in repository settings

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages** (left sidebar).
3. Under **Source**, select **GitHub Actions**.
4. Click **Save**.

The included workflow (`.github/workflows/deploy.yml`) will automatically build and deploy the site every time you push to the `main` branch.

---

### Step 2 — Connect your custom domain via Cloudflare DNS (no NS change required)

You can keep Cloudflare as your DNS provider **without** transferring nameservers anywhere. Cloudflare acts as the DNS proxy; GitHub Pages serves the HTML; Appwrite Cloud handles the backend — all three work together seamlessly.

#### 2a. Update the CNAME file

Replace the placeholder in the `CNAME` file with your actual domain, e.g.:

```
futurepreneurs.social
```

or a subdomain like:

```
ecell.youruniversity.edu
```

Commit and push the change — GitHub Pages reads this file automatically.

#### 2b. Add DNS records in Cloudflare (no nameserver change needed)

Log in to [dash.cloudflare.com](https://dash.cloudflare.com), select your domain, and go to **DNS → Records**.

**For an apex/root domain** (e.g. `futurepreneurs.social`), add four **A records**:

| Type | Name | Content         | Proxy status |
|------|------|-----------------|--------------|
| A    | @    | 185.199.108.153 | DNS only ☁️ (grey cloud) |
| A    | @    | 185.199.109.153 | DNS only ☁️ |
| A    | @    | 185.199.110.153 | DNS only ☁️ |
| A    | @    | 185.199.111.153 | DNS only ☁️ |

> ⚠️ Set the proxy status to **DNS only** (grey cloud) for these A records.
> GitHub Pages handles TLS/HTTPS itself and requires direct DNS resolution.

**For a `www` subdomain**, add a CNAME record:

| Type  | Name | Content                | Proxy status |
|-------|------|------------------------|--------------|
| CNAME | www  | 123kediat.github.io    | DNS only ☁️ |

> DNS changes typically propagate within a few minutes inside Cloudflare.

#### 2c. Enable HTTPS on GitHub Pages

Once GitHub detects your domain (usually within a few minutes after DNS propagates):

1. Go to **Settings → Pages**.
2. Tick **Enforce HTTPS**.

Your site will then be served securely at `https://futurepreneurs.social`.

---

## 🗄️ Appwrite backend setup

The contact form uses [Appwrite Cloud](https://cloud.appwrite.io) as its backend. This works
with any frontend domain — **no nameserver change is required** for Cloudflare users.

### Step 1 — Create an Appwrite project

1. Sign up / log in at <https://cloud.appwrite.io>.
2. Click **Create project**, give it a name (e.g. *futurepreneurs*), and note the **Project ID**.

### Step 2 — Add your domain as a Web platform

Inside your project go to **Overview → Platforms → Add a platform → Web**.

| Field    | Value                      |
|----------|----------------------------|
| Name     | Futurepreneurs Site        |
| Hostname | `futurepreneurs.social`    |

This configures Appwrite's CORS policy so requests from your domain are accepted.
No DNS change is needed — Appwrite Cloud is reached directly at `cloud.appwrite.io`.

### Step 3 — Create a database and collection

1. In the sidebar, open **Databases → Create database**.
   Note the **Database ID** shown after creation.
2. Inside the database, click **Create collection** (e.g. name it *contacts*).
   Note the **Collection ID**.
3. Add the following **attributes** to the collection:

   | Key          | Type   | Required |
   |--------------|--------|----------|
   | name         | String | ✅        |
   | email        | String | ✅        |
   | subject      | String | ✅        |
   | message      | String | ✅        |
   | submitted_at | String | ✅        |

4. Under **Settings → Permissions** for the collection, add:
   - **Role: Any** → **Create** ✅  
     *(allows anonymous visitors to submit the form)*

### Step 4 — Set the IDs in `index.html`

Open `index.html` and replace the four placeholder values near the top of the file:

```js
var APPWRITE_ENDPOINT       = 'https://cloud.appwrite.io/v1';
var APPWRITE_PROJECT_ID     = 'YOUR_PROJECT_ID';    // ← paste your Project ID
var APPWRITE_DATABASE_ID    = 'YOUR_DATABASE_ID';   // ← paste your Database ID
var APPWRITE_COLLECTION_ID  = 'YOUR_COLLECTION_ID'; // ← paste your Collection ID
```

Commit and push — the contact form will now store submissions in Appwrite.

### How it works (no NS change needed)

```
Browser (futurepreneurs.social)
  │
  ├─ HTML/CSS/JS ──► GitHub Pages (served directly, resolved via Cloudflare DNS)
  │
  └─ API calls ────► https://cloud.appwrite.io/v1  (direct, CORS allowed for your domain)
```

Cloudflare DNS resolves your domain to GitHub Pages' servers. The Appwrite SDK inside the page calls
`cloud.appwrite.io` directly from the visitor's browser — a completely separate request that
does **not** need to go through your domain at all.

---

## 📁 Repository structure

```
index.html   ← Full website (single-page)
CNAME        ← Your custom domain (edit this)
.github/
  workflows/
    deploy.yml   ← Auto-deploy to GitHub Pages
```
