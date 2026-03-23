# Namecheap Shared Hosting: SSL + Deploy

You have **bhargavpatel.dev** on Namecheap shared hosting (cPanel). Here’s how to fix SSL and get your site live.

---

## 1. Enable SSL for bhargavpatel.dev

In **cPanel**:

**The page you’re on (“SSL/TLS” with “Default SSL/TLS Key Type”) is only for key settings. Leave it as is (RSA, 2,048-bit is fine).**

To install a certificate for your domain, use one of these:

### Option A: SSL/TLS Status (best)

1. In the **Security** section of cPanel, open **SSL/TLS Status** (not “SSL/TLS”).
2. You’ll see a list of domains (e.g. bhargavpatel.dev, www.bhargavpatel.dev) and their SSL status.
3. Find **bhargavpatel.dev** and click **Run AutoSSL** (or **Install**, **Issue**, etc.) for that row.
4. Wait 2–5 minutes. When the status shows **Valid** or a green check, the certificate is active.

### Option B: AutoSSL / Let’s Encrypt

1. In cPanel search (top) type **AutoSSL** or **Let's Encrypt**.
2. Open it and run **Run AutoSSL** (or **Enable** for your domain) so it issues a free certificate for bhargavpatel.dev.
3. Wait until it reports success.

### Option C: Manage SSL sites

1. In **Security**, open **Manage SSL sites** (under SSL/TLS).
2. If you have no cert yet, use **Run AutoSSL** from **SSL/TLS Status** first (Option A).
3. Here you can see which certificate is installed for which domain and fix mismatches.

After the certificate is valid, **https://bhargavpatel.dev** should work (once site files are in public_html).

---

## 2. Build your React site locally

On your computer, in the project folder:

```bash
npm install
npm run build
```

This creates a **`dist`** folder with the production files.

---

## 3. Upload the site to the server

1. In cPanel, open **File Manager**.
2. Go to **public_html** (this is the root for bhargavpatel.dev).
3. **Empty** the contents of `public_html` (or rename the current folder as backup).  
   Do **not** delete the folder itself.
4. Upload **everything inside** your local **`dist`** folder into **public_html**:
   - `index.html` (at the root of public_html)
   - `assets/` folder (with JS and CSS inside)

So after upload, `public_html` should look like:

- `public_html/index.html`
- `public_html/assets/` (with .js and .css files)

Do **not** upload the whole `dist` folder; only its contents.

**Upload methods:**

- **File Manager:** Select “Upload”, then drag and drop the contents of `dist`.
- **FTP:** Connect with the FTP user from cPanel, go to `public_html`, and upload the same contents.

---

## 4. SPA routing (.htaccess)

The project has a **`public/.htaccess`** file. Vite copies it into `dist` when you build, so after upload you should have:

- `public_html/.htaccess`

If you don’t see `.htaccess` in `dist`, then:

1. In File Manager, enable “Show Hidden Files”.
2. Copy the **`.htaccess`** from the project’s **`public`** folder into **public_html** (same contents as in the repo).

That `.htaccess` sends all requests to `index.html` so your React app works when someone opens a direct link or refreshes.

---

## 5. Check that the domain points to this hosting

In **Namecheap** (domain dashboard, not cPanel):

- **Domain List** → **Manage** for bhargavpatel.dev.
- Under **Nameservers**, use **Namecheap BasicDNS** (or the nameservers your hosting provider gave you).

If the domain was already working with “This site can’t be reached” before, nameservers are likely correct and the main issue was missing SSL and/or missing site files.

---

## Quick checklist

- [ ] SSL enabled for bhargavpatel.dev in cPanel (SSL/TLS Status or AutoSSL).
- [ ] `npm run build` run locally; `dist` folder created.
- [ ] Contents of `dist` (including `index.html` and `assets/`) uploaded to **public_html**.
- [ ] `.htaccess` is in **public_html** (from `public/.htaccess` or copied from repo).
- [ ] Visit **https://bhargavpatel.dev** and test.

If you still see “no valid SSL certificate”, wait 5–10 minutes after running AutoSSL and try again. If it persists, contact Namecheap support and ask them to enable SSL for bhargavpatel.dev on your shared hosting.
