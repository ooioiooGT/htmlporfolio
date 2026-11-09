# Gilber Chen Portfolio

A three-page personal portfolio built with HTML, CSS, and vanilla JavaScript. No build step, package installation, or backend is required.

## Pages

- `index.html`: introduction, portrait, mission, experience, education, and skills.
- `projects.html`: project summaries, screenshots, and links, starting with Meal Rush.
- `contact.html`: email, LinkedIn, Instagram, and YouTube.
- `assets/styles.css`: shared layout, colors, typography, and mobile styles.
- `assets/script.js`: automatically updates the footer year.

The editorial layout uses Georgia for display headings, the system font for body text, and shared color variables in the stylesheet. Experience entries appear in three columns on wide screens and stack on smaller screens.

## Preview locally

Open `index.html` directly in your browser, or serve the folder with Python:

```sh
python3 -m http.server 8000
```

On Windows with the Python launcher, use `py -m http.server 8000`. Open http://localhost:8000 and stop the server with Ctrl+C.

## Edit the content

Edit the relevant HTML page directly. The mission on the home page is an initial draft and can be replaced with your own wording. Resume accomplishments have been shortened for the web. The phone number and source resume PDF are intentionally excluded from the public site.

To add a project, add an `article` with class `card` inside the `project-grid` in `projects.html`. Include a title, summary, and project link. Store any screenshots in `assets/` and give them descriptive alternative text.

Replace `assets/gilber-chen.jpg` to change the portrait, and update the image dimensions and alternative text in `index.html` if needed. Adjust the variables at the top of `assets/styles.css` for colors. Navigation and footers are repeated across the three HTML files; update all three when changing shared links.

## GitHub update workflow

Repository: https://github.com/ooioiooGT/htmlporfolio

For each completed update:

1. Make the change and check all three pages on mobile and desktop.
2. Check navigation, local assets, contact links, and keyboard focus.
3. Update this README if setup or usage changes, and add a dated entry to `CHANGELOG.md` describing the update.
4. Review and push the changes:

```sh
git diff --check
git diff
git add index.html projects.html contact.html assets README.md CHANGELOG.md .gitignore
git commit -m "Describe the portfolio update"
git push origin main
```

Do not commit passwords, server keys, private documents, or files containing contact information you do not want public.

## Host on Ubuntu with Nginx

The following example serves this static website from `/var/www/htmlporfolio`. Run it on your Ubuntu server. Replace `YOUR_DOMAIN` with your actual domain before enabling the configuration.

```sh
sudo apt update
sudo apt install nginx git
sudo git clone https://github.com/ooioiooGT/htmlporfolio.git /var/www/htmlporfolio
```

Create `/etc/nginx/sites-available/htmlporfolio`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name YOUR_DOMAIN;
    root /var/www/htmlporfolio;
    index index.html;

    # Prevent public access to Git metadata and other hidden files.
    location ~ /\. {
        deny all;
    }

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Enable the site and validate the configuration:

```sh
sudo ln -s /etc/nginx/sites-available/htmlporfolio /etc/nginx/sites-enabled/htmlporfolio
sudo nginx -t
sudo systemctl reload nginx
```

Point your domain's DNS to the server and allow HTTP/HTTPS in your server or cloud firewall. After DNS resolves, enable HTTPS:

```sh
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d YOUR_DOMAIN
```

To download later website updates:

```sh
sudo git -C /var/www/htmlporfolio pull --ff-only origin main
```

Static content updates do not require an Nginx restart. Avoid editing the deployed checkout directly; make changes in your development copy and push them first.
