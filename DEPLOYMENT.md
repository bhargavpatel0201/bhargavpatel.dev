# Deploy bhargavpatel.dev (Namecheap + static host)

Your domain **bhargavpatel.dev** is on Namecheap, but the site must be **hosted** somewhere. Namecheap only holds the domain; you need a host that serves your built React files.

---

## Option A: Vercel (recommended, free)

1. **Push your code to GitHub** (if not already).

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
   - Click **Add New… → Project**, import your `bhargav-portfolio` repo.
   - **Root Directory:** leave as is. **Build Command:** `npm run build`. **Output Directory:** `dist`.
   - Deploy. You’ll get a URL like `bhargav-portfolio-xxx.vercel.app`.

3. **Connect your domain**
   - In the Vercel project: **Settings → Domains** → Add `bhargavpatel.dev` and `www.bhargavpatel.dev`.
   - Vercel will show the DNS records you need.

4. **Set DNS in Namecheap**
   - Log in to Namecheap → **Domain List** → **Manage** next to bhargavpatel.dev.
   - Go to **Advanced DNS**.
   - Add/update:
     - **A Record:** Host `@`, Value `76.76.21.21` (Vercel’s IP).
     - **CNAME Record:** Host `www`, Value `cname.vercel-dns.com`.
   - Remove any other A/CNAME for `@` or `www` that conflict.
   - Save. Propagation can take from a few minutes up to 24–48 hours.

5. **SSL:** Vercel will issue a certificate automatically once DNS is correct.

---

## Option B: Netlify (free)

1. Go to [netlify.com](https://netlify.com), sign in, **Add new site → Import from Git** (e.g. GitHub).
2. **Build command:** `npm run build`. **Publish directory:** `dist`.
3. After deploy, **Domain settings → Add custom domain** → `bhargavpatel.dev`.
4. In Namecheap **Advanced DNS**:
   - **A Record:** `@` → `75.2.60.5` (Netlify load balancer).
   - **CNAME:** `www` → `your-site-name.netlify.app` (exact value Netlify shows).

---

## Option C: Namecheap Shared Hosting (if you bought it)

1. Build locally: `npm run build`.
2. In **Namecheap cPanel** (or File Manager), open the folder for your domain (often `public_html`).
3. Upload **all contents** of the project’s `dist` folder (not the folder itself) into that directory.
4. Ensure the domain in Namecheap is pointed to this hosting (usually automatic if domain and hosting are on the same account).

---

## Why “This site can’t be reached” / timeout?

- **DNS not set:** The domain is not pointing to any server. Fix by adding the A and CNAME records above (Option A or B).
- **Nothing deployed:** The host (Vercel/Netlify/hosting) has no site yet. Deploy first, then set DNS.
- **Wrong record values:** Double-check IP and CNAME values against the host’s instructions.
- **Propagation:** After changing DNS, wait up to 24–48 hours.

After DNS and deployment are correct, **https://bhargavpatel.dev** should load your portfolio.
