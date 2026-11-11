/* EXAMPLE SEED CATALOGUE — this is the file to edit.
   The shop, basket, quick list, page view, list view and crop headings all read this list.

   SET THE MEMBERS DISCOUNT HERE:
   meta.memberDiscountPercent is the percent off seed list prices.
   25 means members pay 25% less. Plants (kind: "plant") stay at list price.
   Leave each item's memberPrice as null so this percentage is used.
   If you type a memberPrice number, that line keeps your number instead.

   Also set:
   meta.deadline       — last order day, written as YYYY-MM-DD
   meta.deadlineLabel  — the same day in words, shown on the pages
   meta.supplierName   — shown instead of a brand name ("your supplier")
   meta.organiserName  — who collects the printed orders ("your seed organiser")

   How a crop works:
   - Each section is one crop. Its name becomes the divider in the shop.
   - Herb sections MUST start with "Herbs: " (for example "Herbs: Basil").
   - A section is treated as fruit if its name is Rhubarb, Strawberry,
     Strawberries (plants), Raspberries, Blackberries, Blueberries, Currants,
     Gooseberry, Loganberries or Rhubarb Crowns, OR if any item has kind: "plant".
   - Everything else is a vegetable.
   - kind is "seed" or "plant".
   - clay: true shows the "Clay-soil friendly" label. tip is an optional local note.
   - url can be "" . Put a full https address there to link out to your supplier.
   - id must be unique. Use the same id in seed-descriptions.js for a growing guide.
*/
window.RGA_KINGS = {
  "meta": {
    "memberDiscountPercent": 25,
    "supplierName": "your supplier",
    "organiserName": "your seed organiser",
    "deadline": "2027-03-31",
    "deadlineLabel": "31 March 2027",
    "source": "",
    "scrapedAt": "",
    "discountNotice": "Group members discount comes from memberDiscountPercent above.",
    "priceLabel": "Regular list price · members price is worked out from memberDiscountPercent",
    "plantNote": "Soft fruit plants are charged at list price (not included in the seed discount).",
    "productCount": 16,
    "categoryCount": 16
  },
  "sections": [
    {
      "name": "Bean",
      "items": [
        {
          "id": "bean-runner",
          "name": "Runner Bean Scarlet Emperor",
          "sku": "BEAN-01",
          "pack": "40 Seeds",
          "listPrice": 2.4,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "A reliable climbing runner bean with scarlet flowers and long pods. Sow after the last frost and give it a tall support.",
          "clay": true,
          "tip": "On heavy soil, sow into pots and plant out once the roots are strong, so you are not walking on wet ground.",
          "kind": "seed"
        }
      ]
    },
    {
      "name": "Beetroot",
      "items": [
        {
          "id": "beet-boltardy",
          "name": "Beetroot Boltardy",
          "sku": "BEET-01",
          "pack": "200 Seeds",
          "listPrice": 1.9,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "A round, sweet beetroot that is slow to bolt. Good for successional sowing from spring into summer.",
          "clay": true,
          "tip": "Sow little and often. Thin seedlings so the roots have room to swell.",
          "kind": "seed"
        }
      ]
    },
    {
      "name": "Carrot",
      "items": [
        {
          "id": "carrot-nantes",
          "name": "Carrot Early Nantes",
          "sku": "CAR-01",
          "pack": "500 Seeds",
          "listPrice": 1.85,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "A quick, blunt-rooted carrot with a sweet flavour. Happier in a fine, stone-free bed or a deep pot.",
          "clay": false,
          "tip": "If your soil is heavy, sow into a trough of compost rather than fighting clods.",
          "kind": "seed"
        }
      ]
    },
    {
      "name": "Courgette",
      "items": [
        {
          "id": "courgette-defender",
          "name": "Courgette Defender",
          "sku": "COUR-01",
          "pack": "10 Seeds",
          "listPrice": 2.6,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "A productive green courgette. One or two plants are usually enough for a household.",
          "clay": false,
          "tip": "Plant into a pocket of compost in a sunny spot, after the last frost.",
          "kind": "seed"
        }
      ]
    },
    {
      "name": "Kale",
      "items": [
        {
          "id": "kale-nero",
          "name": "Kale Nero di Toscana",
          "sku": "KALE-01",
          "pack": "150 Seeds",
          "listPrice": 2.15,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "Dark Italian kale with narrow, blistered leaves. Stands well through winter.",
          "clay": true,
          "tip": "Net against pigeons. It does well on fertile clay once the bed is mulched.",
          "kind": "seed"
        }
      ]
    },
    {
      "name": "Pea",
      "items": [
        {
          "id": "pea-kelvedon",
          "name": "Pea Kelvedon Wonder",
          "sku": "PEA-01",
          "pack": "250 Seeds",
          "listPrice": 2.2,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "A compact, early pea with a good crop of sweet pods. Useful where space is short.",
          "clay": true,
          "tip": "Sow into guttering of compost if the plot is too wet to walk on.",
          "kind": "seed"
        }
      ]
    },
    {
      "name": "Tomato",
      "items": [
        {
          "id": "tom-delight",
          "name": "Tomato Gardener's Delight",
          "sku": "TOM-01",
          "pack": "30 Seeds",
          "listPrice": 2.5,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "A well-known cherry tomato with a rich, sweet flavour. Happy in a greenhouse, a grow bag or a large pot.",
          "clay": true,
          "tip": "Start indoors in March. Do not plant outside until the nights are reliably mild.",
          "kind": "seed"
        },
        {
          "id": "tom-moneymaker",
          "name": "Tomato Moneymaker",
          "sku": "TOM-02",
          "pack": "50 Seeds",
          "listPrice": 2.1,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "A traditional medium tomato with a heavy crop. Stake it and pinch out the side shoots.",
          "clay": false,
          "tip": "Water at the roots and keep the leaves dry to reduce blight risk.",
          "kind": "seed"
        }
      ]
    },
    {
      "name": "Herbs: Basil",
      "items": [
        {
          "id": "herb-basil",
          "name": "Basil Sweet Genovese",
          "sku": "HERB-01",
          "pack": "200 Seeds",
          "listPrice": 1.95,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "Classic pesto basil. Sow in warmth and do not put it outside until summer.",
          "clay": false,
          "tip": "A sunny windowsill is safer than a cold clay bed in spring.",
          "kind": "seed"
        }
      ]
    },
    {
      "name": "Herbs: Chives",
      "items": [
        {
          "id": "herb-chives",
          "name": "Chives Common",
          "sku": "HERB-02",
          "pack": "300 Seeds",
          "listPrice": 1.7,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "A perennial herb with mild onion leaves and edible purple flowers.",
          "clay": true,
          "tip": "Once established it clumps up and can be split for the sharing table.",
          "kind": "seed"
        }
      ]
    },
    {
      "name": "Herbs: Coriander",
      "items": [
        {
          "id": "herb-coriander",
          "name": "Coriander Slow Bolt",
          "sku": "HERB-03",
          "pack": "150 Seeds",
          "listPrice": 1.8,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "A leaf coriander that is slower to run to seed in warm weather. Sow little and often.",
          "clay": false,
          "tip": "Sow in a pot if you want to move it out of the midday sun.",
          "kind": "seed"
        }
      ]
    },
    {
      "name": "Herbs: Parsley",
      "items": [
        {
          "id": "herb-parsley",
          "name": "Parsley Flat Leaf",
          "sku": "HERB-04",
          "pack": "400 Seeds",
          "listPrice": 1.65,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "Flat-leaved parsley for cooking. Slow to germinate — be patient and keep the compost moist.",
          "clay": true,
          "tip": "It will stand outside through a mild winter if you cover it in hard frost.",
          "kind": "seed"
        }
      ]
    },
    {
      "name": "Gooseberry",
      "items": [
        {
          "id": "goose-invicta",
          "name": "Gooseberry Invicta",
          "sku": "FRUIT-01",
          "pack": "20 Seeds",
          "listPrice": 2.95,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "An example fruit seed. Seed-raised gooseberries vary, so many clubs prefer named plants. This line is here to show a fruit seed with the members discount.",
          "clay": false,
          "tip": "For a predictable bush, order a named plant instead of seed.",
          "kind": "seed"
        }
      ]
    },
    {
      "name": "Raspberries",
      "items": [
        {
          "id": "rasp-autumn",
          "name": "Raspberry Autumn Bliss",
          "sku": "FRUIT-02",
          "pack": "1 cane",
          "listPrice": 4.5,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "An autumn-fruiting raspberry cane. Cut all the canes to the ground in late winter.",
          "clay": true,
          "tip": "Plant into composted ground and mulch. This is a plant, so it stays at list price.",
          "kind": "plant"
        }
      ]
    },
    {
      "name": "Rhubarb",
      "items": [
        {
          "id": "rhubarb-victoria",
          "name": "Rhubarb Victoria",
          "sku": "FRUIT-03",
          "pack": "1 crown",
          "listPrice": 5.25,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "A reliable rhubarb crown for a permanent bed. Do not pull stalks in the first year.",
          "clay": true,
          "tip": "Plant where it can stay. Rhubarb crowns are plants and are not in the seed discount.",
          "kind": "plant"
        }
      ]
    },
    {
      "name": "Strawberry",
      "items": [
        {
          "id": "straw-alpine",
          "name": "Strawberry Alpine",
          "sku": "FRUIT-04",
          "pack": "100 Seeds",
          "listPrice": 2.35,
          "premium": false,
          "memberPrice": null,
          "url": "",
          "desc": "Small, fragrant alpine strawberries. They fruit over a long season and suit an edge or a pot.",
          "clay": false,
          "tip": "Sow on the surface of moist compost and do not bury the seed.",
          "kind": "seed"
        }
      ]
    }
  ]
};
