# Futurepreneurs — E-Cell TIU

Single-page website for the Futurepreneurs Entrepreneurship Cell, Techno India University.

---

## ✅ Setup status — what's done and what you still need to do

| # | Task | Status |
|---|------|--------|
| 1 | Appwrite endpoint wired in (`https://sgp.cloud.appwrite.io/v1`) | ✅ Done — already in `index.html` |
| 2 | Appwrite Project ID wired in (`69b67ac60019d400836a`) | ✅ Done — already in `index.html` |
| 3 | Add your site domain as a **Web platform** in Appwrite Console — tile **Web**, type **JavaScript**, hostname `futurepreneurs.social` | ⬜ **You do this** — see "Appwrite backend setup → Step 2" below |
| 4 | Create a **Database** in Appwrite Console, copy its ID | ✅ Done — `69b67af80013aa9b99b1` wired into `index.html` |
| 5 | Create a **Collection** with 5 attributes + "Any → Create" permission (in the collection's **Settings** tab) | ✅ Done — collection `fp-db` created |
| 6 | Paste the Database ID & Collection ID into `index.html` | ✅ Done — both IDs wired into `index.html` |

> **Short answer to "is everything connected?"**  
> Almost — **one manual step remains**: row 3 above (add your site domain as a Web platform in
> the [Appwrite Console](https://cloud.appwrite.io)). All four IDs in `index.html` are already
> wired in; CNAME is set; rows 4–6 are done in code. See "Appwrite backend setup → Step 2" below.

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
| A    | @    | 185.199.108.153 | DNS only ☁️ |
| A    | @    | 185.199.109.153 | DNS only ☁️ |
| A    | @    | 185.199.110.153 | DNS only ☁️ |
| A    | @    | 185.199.111.153 | DNS only ☁️ |

> ⚠️ Set the proxy status to **DNS only** (grey cloud — not orange/proxied) for **all four** A records.
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

1. Inside your project, click **Overview** in the left sidebar.
2. Scroll down to the **Platforms** section and click **Add a platform**.
3. A modal/dialog opens with a row of platform **type tiles**. It looks like this:

   ```
   ┌───────────────────────────────────────────────────────────────┐
   │  Add a platform                                               │
   │                                                               │
   │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
   │  │   🌐    │  │   🦋    │  │   🍎    │  │   🤖    │        │
   │  │   Web   │  │ Flutter │  │  Apple  │  │ Android │  ...   │
   │  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
   │      ▲                                                        │
   │      └── Click THIS tile                                      │
   └───────────────────────────────────────────────────────────────┘
   ```

   **Click the "Web" tile** — this is the platform type. Ignore Flutter, Apple, Android, etc.

4. After clicking **Web**, a form appears with **three** fields. Fill them in exactly as shown:

   | Field        | What to select / type       | Why                                           |
   |--------------|-----------------------------|-----------------------------------------------|
   | **Type**     | **JavaScript**              | The site is a plain HTML + JS file — no React, Vue, Next.js, etc. |
   | **Name**     | `Futurepreneurs Site`       | A human-readable label (your choice)          |
   | **Hostname** | `futurepreneurs.social`     | The domain Appwrite will allow API calls from |

   > **Type options you will see — and why to pick JavaScript:**
   > ```
   > ○ Svelte       ○ React      ○ Nuxt       ○ Next.js
   > ○ Vue          ○ Angular    ○ TanStack   ● JavaScript  ← select this
   > ```
   > This project is a single `index.html` file that loads the Appwrite JS SDK via a `<script>` tag.
   > It does not use any framework, so **JavaScript** is the correct type.

   > **Hostname rules** — must be your bare domain:  
   > ✅ correct: `futurepreneurs.social`  
   > ❌ wrong: `https://futurepreneurs.social` (no protocol)  
   > If you also need `www.futurepreneurs.social`, add it as a **second** separate Web platform entry.

5. Click **Next** → **Create** (button label may say **Next** or **Register** depending on your Console version) to save.

> **Tip:** Repeat steps 2–5 to add a second Web platform with **Hostname** `localhost` if you want to test the contact form locally.

This tells Appwrite which domains are allowed to call the API (CORS). No DNS change is needed — the browser calls `cloud.appwrite.io` directly.

### Step 3 — Create a database and collection ✅ Already done

> Database `69b67af80013aa9b99b1` and collection `fp-db` are already created and wired into
> `index.html`. The steps below are kept for reference only.
> *(Note: `fp-db` is a custom collection ID — Appwrite allows both custom string IDs and
> auto-generated alphanumeric IDs. Both are valid.)*

1. In the sidebar, open **Databases → Create database**.
   Note the **Database ID** shown after creation.
2. Inside the database, click **Create collection** (e.g. name it *contacts*).
   Note the **Collection ID**.
3. The following **attributes** must exist on the collection (all five are required):

   | Key          | Type   | Required |
   |--------------|--------|----------|
   | name         | String | ✅        |
   | email        | String | ✅        |
   | subject      | String | ✅        |
   | message      | String | ✅        |
   | submitted_at | String | ✅        |

4. Set **Permissions** on the collection so anonymous visitors can submit the form:

   > **Where to find it:** Click on the **collection name** (not the database) in the left panel.
   > At the top of the collection page you will see tabs: **Documents · Attributes · Indexes · Settings**.
   > Click **Settings**, then scroll down to the **Permissions** section.
   > *(If your Appwrite Console shows a dedicated **Permissions** tab instead, click that tab directly.)*

   Inside Permissions:
   - Click **Add role** → choose **All users** (labelled `any` in older Console versions)
   - Tick the **Create** checkbox ✅
   - Click **Update** to save

   This allows any visitor to submit the contact form without needing an account.

### Step 4 — Set the IDs in `index.html` ✅ Already done

All four values below are already set for this project — no edits needed:

```js
var APPWRITE_ENDPOINT       = 'https://sgp.cloud.appwrite.io/v1';
var APPWRITE_PROJECT_ID     = '69b67ac60019d400836a';    // ✅ set
var APPWRITE_DATABASE_ID    = '69b67af80013aa9b99b1'; // ✅ set
var APPWRITE_COLLECTION_ID  = 'fp-db'; // ✅ set
```

Commit and push — the contact form will now store submissions in Appwrite.

### How it works (no NS change needed)

```
Browser (futurepreneurs.social)
  │
  ├─ HTML/CSS/JS ──► GitHub Pages (served directly, resolved via Cloudflare DNS)
  │
  └─ API calls ────► https://sgp.cloud.appwrite.io/v1  (direct, CORS allowed for your domain)
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
