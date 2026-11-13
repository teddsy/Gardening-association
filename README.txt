Ruddington Gardeners' Association - full demo site
Open index.html (Home). All pages are static HTML; no server code. The members area is open for this demonstration, with a notice that it will normally be password protected.

Deploy - Netlify Drop: unzip, drag the folder onto https://app.netlify.com/drop (claim with a free account to keep it).
Deploy - GitHub Pages: create a public repo (e.g. rga-demo), upload all files (including .nojekyll) to the root,
then Settings > Pages > Branch: main, folder / (root). Site appears at https://<user>.github.io/rga-demo/

Members area: members.html links to —
  seed-order.html (Members Group Seed Purchase – Mike Davey's bulk order demo),
  seed-quicklist.html (Quick order list – one compact row per product, shared basket),
  members-apparel.html (Members Apparel Order – tees, hoodies, caps, totes; demo basket/print only),
  members-produce-plants-seeds.html (Produce, Plants & Seeds sharing board),
  growing-guide.html (Growing Guide: Crop Guide, Monthly Jobs, Local Growing Tips, Growing Assistant),
  plus member-posts.html.
members-produce-seeds.html redirects to members.html (old combined page retired).
plantsales.html redirects to members-produce-plants-seeds.html.
Demo pages (marked Demo): seed-order.html, members-apparel.html and member-posts.html.
members-apparel.html stores the apparel basket in localStorage key rgaApparelBasket (no payment, no shop link).
Demo product photos live in apparel/ (generated for this prototype).
Both store data only in the visitor's browser (localStorage). Supabase is OPTIONAL: to make Member Posts live,
run supabase-setup.sql in a Supabase project and plug its URL/anon key into the adapter in member-posts.html.
knowledge-hub.html redirects to growing-guide.html. Clay, no-dig, frost, pest and allotment notes are on tips.html. Month-by-month jobs are on monthly.html. Crop notes are in knowledge/index.html. RGA-Knowledge-Base.txt is the older plain-text source.

Members' Board (Padlet)
- Embedded on members.html (separate from Member Posts).
- Board: https://padlet.com/teddsy62/rga-members-board-s02569uy971knkz5tzg0
- Embed: https://padlet.com/embed/s02569uy971knkz5tzg0
- Prototype note on the page; tap + to post (posts appear as anonymous).

Members Group Seed Purchase – online-shop style (redesign 7 Nov 2026)
- seed-order.html: short landing (3 category flip cards, deadline, how it works).
- seed-shop.html: category tabs, crop dropdown, search, sort, clay filter, 24 items per page with page links (URL keeps state).
- seed-product.html?id=…: one product, prices, description/growing guide (loaded only here), quantity + Add to basket, local rating.
- seed-basket.html: quantities, remove, empty, Regular / Members / You save totals, Print summary for Mike.
- Logic in shop-core.js (tested), page code in shop-ui.js; catalogue kings-seeds-data.js (908 lines, 153 crops). Basket key rgaKingsCart unchanged.
- Group members discount: 25% off all Kings Seeds seeds — orders close 31 January 2027. Every seed line shows Regular (struck through) and Members prices; soft fruit plants stay at list price (not in seed discount). Basket and order summary show Regular total, Members total and You save.
- Orders close 31 January 2027. Demo – no payment taken; print summary for Mike Davey.

Local Links (local-links.html)
- In main nav on every page (before Members): councils, village venues, allotments,
  gardening orgs (RHS, NAS, Garden Organic, Gardeners' World), nearby garden centres,
  wildlife/weather and community help (101 / NHS 111 / Citizens Advice).
- Contact details checked against official sites on 5 Nov 2026; report updates to
  enquiries@ruddingtongardeners.co.uk.


Members area (open for demonstration)
- The demo sign-in overlay is switched off, so members pages open freely.
- A bold red notice on members, seed shop, apparel, produce, Member Posts, Growing Guide, Monthly Jobs, Local Growing Tips and Crop Guide pages explains
  that this area will normally be password protected and is open here for demonstration only.
- members-gate.js still exposes a window.RGA_MEMBERS session API (localStorage key rgaMembersSession)
  for optional name use on printed summaries; it does not lock the page.
- Member Posts still has its own demo login for posting, liking and commenting; the feed can be read without signing in.
- Seed and apparel order forms ask for a name on the printed summary.

Background: CSS leaf pattern (SVG data URI) — rga-leaves-bg.png removed (had a stock watermark).
Hero photos rga-hero.jpg, rga-allotment.jpg, rga-raised.jpg checked 5 Nov 2026: no visible watermarks.

Join page: enquiry form opens the visitor's email app (mailto) to enquiries@ruddingtongardeners.co.uk.

Design polish (5 Nov 2026): classy double-line green/gold borders, soft shadows, corner leaves,
pill buttons that lift on hover, Fraunces + Atkinson Hyperlegible fonts. Styles live at the end of
style.css (and inside seed-order.html, which has its own styles). Backup before this change:
rga-full-site-backup-polish.

Design update (5 Nov 2026) – "Sunset Garden" look
- Soft rose, peach, butter-yellow and sage washes; frosted pill header; arched hero photo on the home page;
  rounded panels with a coral line and gold inner rule; raspberry-red pill buttons with hover lift; plum headings.
- Theme lives at the end of style.css (and is copied into seed-order.html / member-posts.html built-in styles).
- Members sign-in panel (members-gate.js) recoloured to match. Photos recompressed (max 1400px).
- All features unchanged: 908 Kings Seeds products, 25% members price, 31 Jan 2027 deadline.
- Previous green design backed up outside the zip (rga-full-site-backup-sunset).

Redesign 7 Nov 2026 – warm cream / terracotta (#ce3a0d) with aubergine (#351c4d) accents, Aleo + Montserrat fonts,
photo flip cards (hover, keyboard focus or 'More info' button; no motion when reduced motion is set). Single theme in style.css;
only the top bar (.site-header) is sticky. Previous look backed up at /workspace/rga-backup-2026-11-07 (not in the zip).

Seed shop (11 Nov 2026): seed-shop.html has a Page view / List view toggle (view=list in the address).
