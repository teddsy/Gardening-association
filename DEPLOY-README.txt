RGA site – how to deploy this version (7 Nov 2026)
IMPORTANT: this is a FULL-SITE update. Replace the WHOLE Netlify deploy – do not upload only one file.
Many pages and new files changed (style.css, members.html, members-gate.js, flip.js, shop-core.js, shop-ui.js,
seed-order.html, seed-shop.html, seed-product.html, seed-basket.html and every page header).
1. Unzip rga-site-redesign-2026-11-07.zip to a folder (index.html is at the top level).
2. Netlify > your site (dapper-mandazi-5f4b28) > Deploys > drag the whole unzipped folder onto the deploy drop area.
3. Hard refresh (Ctrl+Shift+R). The members area is open for this demonstration (no sign-in code).
Demo only: no payment is taken and nothing is sent online. Existing seed baskets (rgaKingsCart) carry over.

NOT YET CHECKED IN A BROWSER: the build tool's browser cannot open local files or localhost (a deliberate security block),
so desktop/mobile layout, the real flip animation, touch, print output and the Botpress chat are UNVERIFIED.
Please check them after deploying: flip a card and press Back, add seeds on the product page with +/-,
use the browser Back button and a second tab and confirm the basket keeps every item, and print the basket.

Update v2 (7 Nov 2026, rga-site-redesign-2026-11-07-v2.zip):
- The footer bar is now warm cream with dark brown text and a terracotta top line (no purple).
- In the seed shop and basket, clicking a seed name or "Details" opens a pop-up box (with quantity and Add to basket)
  instead of a new page. Close with ×, the Close button or Escape, and you are back at the same place in the list.
  Ctrl/Cmd-click still opens the full product page (seed-product.html), which also works as a share link.
- Still NOT checked in a real browser (local browser security block): please try the pop-up on desktop and phone.

Update v3 (rga-site-redesign-2026-11-07-v3.zip): "Ruddington weather" links (Home hero buttons, Members welcome box,
Local Links > Wildlife & weather) open Weather Underground's Ruddington page in a separate, smaller, resizable window,
so the RGA page stays open behind it. Some browsers and phones use a normal tab instead. Weather Underground does not allow
its page to be shown inside our site, so it opens separately. NOT checked in a real browser yet – please click it once after deploying.

Update v4 (rga-site-redesign-2026-11-07-v4.zip): an original watercolour strip of seven fruits and vegetables
(rga-produce-strip.webp) fills the empty space at the top right of the Home page, above the garden photo. It sits inside the
photo column, so it can't overlap the heading. On phones it shows between the heading and the photo. Not yet viewed in a real browser.

v5 note (9 Nov 2026)
--------------------
Small watercolour fruit/veg decorations now appear on most pages (not the home hero
strip, which is unchanged). They live in img/produce/*.webp and are purely decorative
— they do not change page layout. Upload the whole unzipped folder so those files
are included.

Update v7 (11 Nov 2026, rga-site-2026-11-11-v7.zip):
- The members area (including the group seed shop, apparel, produce sharing and Member Posts)
  is open without the demo sign-in overlay. A bold red notice on those pages explains that
  this area will normally be password protected and is open here for demonstration only.
- Member Posts can be read without signing in; signing in is still needed to post, like or comment.
- Upload the whole unzipped folder (including img/produce).

Update v8 (11 Nov 2026, rga-site-2026-11-11-v8.zip):
- New Quick order list (seed-quicklist.html): all 908 seed and plant lines in one scrolling list
  (type, variety, packet size, regular and members prices, and a tick box). Tick adds 1 to the
  usual basket; untick removes it. A bar at the bottom shows the totals and a Buy now button
  that opens the existing basket page. Linked from the seed purchase page, the seed shop and
  the Members hub. Upload the whole unzipped folder.

Update v11 (11 Nov 2026, rga-site-2026-11-11-v11.zip):
- The seed shop (vegetables, herbs and fruit) has a Page view / List view toggle. Page view is the
  usual card grid, 24 to a page. List view uses the Quick order list layout: one line per product,
  grouped under the terracotta crop headings, tick boxes in the shared basket, all matching items
  in one scroll, with totals and Buy now at the bottom (kept clear of the Netlify badge). The choice
  is remembered in the address (view=list) and in the browser.
- The seed purchase home page links to both views and lists every crop under the same headings.
- The Members hub seed card now simply says “Order or browse here”.
- Upload the whole unzipped folder.
