# Make this site yours

This folder is a complete example website for a gardening club. You can change it with a text editor (Notepad on Windows, TextEdit on a Mac, or any editor that saves plain text). You do not need to be a programmer.

Keep all the files in this folder together. The links between pages are relative, so the site works in a subfolder such as `/template/` and also on its own.

The red line on the members pages is meant to stay. It says the members area will normally be password protected and is open here only as a demonstration. This template does not include a real password. Do not put private member details on these pages until you add a proper login.

## Change the colours

Open `style.css`. Near the top, inside `:root { ... }`, are the colour names the whole site uses. Change the code after the colon. Keep the semicolon. Save the file and refresh the page.

| Name | What it controls | Starts as |
| --- | --- | --- |
| `--rust` | Main buttons, the line on the footer, the underline on the current menu item | `#ce3a0d` terracotta |
| `--rust-dk` | Button colour when you hover, and the colour of links | `#a52e0a` |
| `--rust-soft` | Pale peach panels, such as “What’s new” | `#fbe7dd` |
| `--aub` | Headings, and the header row of tables | `#351c4d` aubergine |
| `--aub-soft` | Pale purple panels | `#efe8f3` |
| `--cream` | The page background | `#fbf7f0` |
| `--paper` | The white boxes the writing sits in | `#ffffff` |
| `--ink` | The main text | `#3b302b` |
| `--muted` | Quieter notes, such as dates and help text | `#6b5e57` |
| `--sage` | The members price in the seed shop, and some green labels | `#4f6b3f` |
| `--sage-soft` | Pale green panels and the “what we offer” boxes | `#e9efe2` |
| `--line` | The thin borders around boxes | `#e6dccf` |
| `--focus` | The outline you see when you tab to a link with the keyboard | `#1d4ed8` |
| `--green-light` | A lighter green used by the Member Posts page | `#6b8a58` |
| `--gold-s` | A small gold highlight | `#e3b86a` |
| `--star` | The star colour on ratings | `#d99a1e` |

`--radius` is how round the corners are. `--shadow` is the soft shadow under boxes. You can leave those alone.

The lines that say `--green:var(--sage)` and `--accent:var(--rust)` follow the colours above. You do not need to edit those.

### Ready-made palettes

Copy one block and paste it over the two colour lines that start with `--rust` and `--cream`, and also replace the `--green-light`, `--gold-s` and `--star` values on the legacy line. Leave the font lines as they are.

**Meadow** (green buttons, leafy headings):

```css
  --rust:#2f6b3a;--rust-dk:#1e4d28;--rust-soft:#e5f2e4;--aub:#1f3b2c;--aub-soft:#e7f0e6;
  --cream:#f7f6ef;--paper:#ffffff;--ink:#243028;--muted:#5c6b60;--sage:#3d6b45;--sage-soft:#e7f0e4;--line:#d5e0d4;
```

and on the next legacy line set `--green-light:#6a9a62;`, `--gold-s:#d4b15a;` and `--star:#c4922a;`

**Seaside** (blue buttons, sandy background):

```css
  --rust:#0e6e8c;--rust-dk:#0a5168;--rust-soft:#e3f3f6;--aub:#16324f;--aub-soft:#e6eef5;
  --cream:#f6f4ee;--paper:#ffffff;--ink:#243038;--muted:#5d6b72;--sage:#3e6b62;--sage-soft:#e5f1ee;--line:#d5e2e4;
```

and `--green-light:#5d8f96;`, `--gold-s:#e0b15a;`, `--star:#c9962e;`

**Plum and apple** (plum buttons, green prices):

```css
  --rust:#7a2f55;--rust-dk:#5c203f;--rust-soft:#f8e8ef;--aub:#2c1a33;--aub-soft:#f3eaf4;
  --cream:#fbf6f2;--paper:#ffffff;--ink:#3a2c32;--muted:#6d5c64;--sage:#4f6b3a;--sage-soft:#eef3e6;--line:#eadfd8;
```

and `--green-light:#7d9a62;`, `--gold-s:#e3b86a;`, `--star:#d99a1e;`

## Change the club name and the words

Search this folder for these example phrases and replace them with your own:

- `Your Gardening Association` — the club name, in the top of every page and in the footer
- `Yourtown` — the placeholder town
- `Wednesdays 7.30pm at Your Venue` — the meeting time and place (About, Meetings, Join and Local Links)
- The welcome paragraph on `index.html`, and the story on `about.html`

The footer of each page also has a line, “Made with the free Gardening Association site template”. You can leave that in place. It is how other clubs find this template.

### Email and phone

There is no real email address or phone number in the template.

On `join.html`, search for `CLUB EMAIL`. Put your club’s address between the quotes:

```js
var CLUB_EMAIL='';
```

becomes something like your own address inside the quotes. Until you do that, the Join button explains that the address is missing, and it does not send anything.

Search for `Add your phone number here` on `join.html` if you want a phone number on the page.

### Chat and a members noticeboard

Those are not included. On `members.html`, search for `CHAT ASSISTANT` or `MEMBERS BOARD`. The notes there tell you where to paste your own link or embed code. If you do not want them, delete the note.

### Weather

Search for `WEATHER LINK`. The example opens a general Yourtown page on Weather Underground. To use your own town: open [wunderground.com](https://www.wunderground.com), search for your town, copy the address of that page, and paste it in place of `https://www.wunderground.com/weather/gb/yourtown`. Do this on `index.html`, `members.html` and `local-links.html`.

### Local links and tips

`local-links.html` is a set of example cards (parish council, library, allotments, a garden centre). Replace each name and each `https://example.com/...` address with a real one, or delete the card.

`tips.html`, `monthly.html` and `knowledge-hub.html` are example growing notes, written with heavy clay in mind. Edit the sentences so they match your soil and your frost dates. Allotment names such as North Field Allotments, Yourtown Community Beds and South Meadow Plots are examples. Replace them.

## Edit the seed list

Open `seed-catalogue.js`. Everything the shop, the basket, the quick list, the page view, the list view and the crop headings need is in this one file. Leave the line `window.RGA_KINGS =` as it is. The shop looks for that name. Edit the list inside it.

At the top, inside `"meta"`, change these:

- `memberDiscountPercent` — the percent off **seeds**. `25` means members pay 25% less. This is the only place you set the discount. The shop pages read it from here. Soft fruit **plants** stay at the list price.
- `deadline` — the last order day, written `2027-03-31` (year, month, day).
- `deadlineLabel` — the same day in words, for example `31 March 2027`. This is what people see.
- `supplierName` — shown where a seed-company name would go. The example says `your supplier`.
- `organiserName` — the person who collects the printed orders. The example says `your seed organiser`.

Each crop is a `"name"` with a list of `"items"`. To add a seed, copy a whole item (from one `{` to the matching `}`), then change:

- `id` — a short unique word, such as `mint-01`. No two items may share an id.
- `name` — the variety people see.
- `pack` — packet size, such as `100 Seeds` or `1 cane`.
- `listPrice` — the normal price in pounds, without a £ sign, such as `2.40`.
- `desc` — a sentence or two.
- `kind` — `"seed"` or `"plant"`. Only seeds get the discount.
- Leave `memberPrice` as `null` so the percentage above is used. If you type a number here, that one line keeps your number instead.
- `clay` — `true` shows a “Clay-soil friendly” label. `false` hides it.
- `url` — leave it as `""`, or put a full `https://` address if you want a link to your supplier.

Herb crops must be named `Herbs: ` plus the herb, including the space and the colon. For example `Herbs: Mint`. Other crops are vegetables, unless the name is a fruit the shop already understands (Strawberry, Raspberries, Gooseberry, Rhubarb, and a few others listed in the comment at the top of the file) or the item is a plant.

`seed-descriptions.js` holds optional longer notes and a growing guide. The word in quotes at the start of each note must match the item’s `id`. You can ignore this file until you want those extra notes.

The pages say it is a demonstration and that no payment is taken. Keep that unless you add a real payment method of your own. This template does not take payment.

## Swap the pictures

The easiest way is to replace the file and keep the same file name.

| File | Where it shows |
| --- | --- |
| `rga-hero.jpg` | Home page photo, and some flip cards |
| `rga-allotment.jpg` | Allotment photo on the home page, tips and cards |
| `rga-raised.jpg` | Raised-bed photo on cards |
| `rga-produce-strip.webp` | The row of fruit and vegetables above the home photo |
| `img/produce/*.webp` | The small fruit and vegetable decorations in the corners of pages |
| `apparel/*.jpg` | The members apparel page |

Use a photo that is roughly the same shape. Home photos look best landscape. If you would rather use a new file name, search the `.html` files for the old name (for example `rga-hero.jpg`) and change it to your new name.

The apparel photographs are sample pictures from the original demo. They still show that club’s printed designs. Replace every file in `apparel/` before you present the page as your own kit. The product names in `apparel-data.js` are already examples. You can edit the names and prices there in the same way as the seed list.

The small pictures in `img/produce/` are the clip-art decorations. Leave them if you like the look.

## Publish it for free

Publish the **contents of this `template` folder**, so that `index.html` is at the top of the site, not buried in another folder. If `index.html` is not at the top, the home page will not open.

### Netlify, by dragging the folder

1. Go to <https://app.netlify.com/drop>
2. If you are asked, create a free account.
3. Drag this `template` folder onto the page. The folder you drop must contain `index.html`, `style.css` and the `img` folder.
4. Netlify gives you an address ending in `.netlify.app`. You can change the name in the site settings.

When you change the words later, drag the folder up again to update the site.

### GitHub Pages

1. Create a new public repository on GitHub (or fork this one and use a copy).
2. Upload **all** the files from this `template` folder into the root of that repository. Include the empty file `.nojekyll`. That file tells GitHub not to ignore any of the pages.
3. In the repository, open **Settings**, then **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**. Branch: `main`. Folder: `/ (root)`.
5. Save. After a minute or two the site is at `https://your-username.github.io/your-repository-name/`

If you leave the files inside a folder called `template`, the site will be at `.../template/` instead of the root. That still works, because the links are relative. For a club site of your own, the root is simpler.
