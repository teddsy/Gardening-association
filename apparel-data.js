/* RGA members apparel demo catalogue — local demo only, not a real shop. */
window.RGA_APPAREL = {
  demo: true,
  note: "Demo catalogue – not real ordering. No payment is taken.",
  profitsNote: "All profits go to supporting the Ruddington Gardeners’ Association.",
  categories: [
    { id: "tees", label: "Tees" },
    { id: "hoodies", label: "Hoodies" },
    { id: "caps", label: "Caps" },
    { id: "totes", label: "Tote bags" },
    { id: "mugs", label: "Mugs" },
    { id: "aprons", label: "Aprons" },
    { id: "garden", label: "Gloves & beanies" }
  ],
  prints: [
    { id: "leaf-hoe", label: "RGA leaf + hoe badge" },
    { id: "wordmark", label: "Ruddington Gardeners’ Association wordmark" },
    { id: "dig-deep", label: "Dig Deep · Ruddington hoe motif" },
    { id: "since-1934", label: "Since 1934 allotment line" }
  ],
  sizesWear: ["S", "M", "L", "XL", "XXL"],
  products: [
    {
      id: "tee-leaf-hoe",
      category: "tees",
      print: "leaf-hoe",
      name: "RGA Leaf & Hoe Tee",
      description: "Soft cotton tee with the RGA circular leaf and garden hoe badge. A classic club motif for plot days and meetings. Demo photo – print layout may vary when a real order runs.",
      image: "apparel/tee-leaf-hoe.jpg",
      price: 16.00,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colours: ["Cream", "Sage", "Navy", "Terracotta"]
    },
    {
      id: "tee-wordmark",
      category: "tees",
      print: "wordmark",
      name: "RGA Wordmark Tee",
      description: "Sage tee carrying the Ruddington Gardeners’ Association wordmark with a small leaf accent. Clean and readable from across the allotment path.",
      image: "apparel/tee-wordmark.jpg",
      price: 16.00,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colours: ["Sage", "Cream", "Navy", "Terracotta"]
    },
    {
      id: "tee-dig-deep",
      category: "tees",
      print: "dig-deep",
      name: "Dig Deep Tee",
      description: "Navy tee with the Dig Deep · Ruddington hoe motif. A cheerful reminder that clay soil rewards patience.",
      image: "apparel/tee-dig-deep.jpg",
      price: 16.00,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colours: ["Navy", "Cream", "Sage", "Terracotta"]
    },
    {
      id: "tee-since-1934",
      category: "tees",
      print: "since-1934",
      name: "Since 1934 Tee",
      description: "Terracotta tee with the Since 1934 allotment line and seedling beds. Marks nearly a century of Ruddington gardening.",
      image: "apparel/tee-since-1934.jpg",
      price: 16.00,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colours: ["Terracotta", "Cream", "Sage", "Navy"]
    },
    {
      id: "hoodie-leaf-hoe",
      category: "hoodies",
      print: "leaf-hoe",
      name: "RGA Leaf & Hoe Hoodie",
      description: "Cosy sage hoodie with the leaf and hoe badge. Handy for chilly spring starts on the plot.",
      image: "apparel/hoodie-leaf-hoe.jpg",
      price: 32.00,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colours: ["Sage", "Cream", "Navy", "Terracotta"]
    },
    {
      id: "hoodie-wordmark",
      category: "hoodies",
      print: "wordmark",
      name: "RGA Wordmark Hoodie",
      description: "Cream hoodie with the plum Ruddington Gardeners’ Association wordmark. Soft everyday layer for meetings at The Hermitage.",
      image: "apparel/hoodie-wordmark.jpg",
      price: 32.00,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colours: ["Cream", "Sage", "Navy", "Terracotta"]
    },
    {
      id: "hoodie-dig-deep",
      category: "hoodies",
      print: "dig-deep",
      name: "Dig Deep Hoodie",
      description: "Terracotta hoodie with the Dig Deep · Ruddington hoe print. Warm enough for late autumn clear-ups.",
      image: "apparel/hoodie-dig-deep.jpg",
      price: 32.00,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colours: ["Terracotta", "Navy", "Sage", "Cream"]
    },
    {
      id: "cap-leaf-hoe",
      category: "caps",
      print: "leaf-hoe",
      name: "RGA Leaf & Hoe Cap",
      description: "Sage baseball cap with an embroidered-style leaf and hoe badge. One size with an adjustable strap (demo).",
      image: "apparel/cap-leaf-hoe.jpg",
      price: 12.00,
      sizes: ["One size"],
      colours: ["Sage", "Navy", "Cream"]
    },
    {
      id: "cap-dig-deep",
      category: "caps",
      print: "dig-deep",
      name: "Dig Deep Cap",
      description: "Navy cap with Dig Deep · Ruddington hoe motif. Keeps the sun off while you weed the beds.",
      image: "apparel/cap-dig-deep.jpg",
      price: 12.00,
      sizes: ["One size"],
      colours: ["Navy", "Sage", "Cream"]
    },
    {
      id: "tote-leaf-hoe",
      category: "totes",
      print: "leaf-hoe",
      name: "RGA Leaf & Hoe Tote",
      description: "Sturdy canvas tote with the leaf and hoe badge. Ideal for market runs and swapping surplus produce.",
      image: "apparel/tote-leaf-hoe.jpg",
      price: 10.00,
      sizes: ["One size"],
      colours: ["Natural", "Sage", "Navy"]
    },
    {
      id: "tote-wordmark",
      category: "totes",
      print: "wordmark",
      name: "RGA Wordmark Tote",
      description: "Cream canvas tote with the Ruddington Gardeners’ Association wordmark. Roomy enough for seed packets and a flask.",
      image: "apparel/tote-wordmark.jpg",
      price: 10.00,
      sizes: ["One size"],
      colours: ["Cream", "Natural", "Navy"]
    },
    {
      id: "tote-since-1934",
      category: "totes",
      print: "since-1934",
      name: "Since 1934 Tote",
      description: "Navy tote with the Since 1934 allotment line. A quiet nod to the club’s long story in Ruddington.",
      image: "apparel/tote-since-1934.jpg",
      price: 10.00,
      sizes: ["One size"],
      colours: ["Navy", "Natural", "Cream"]
    },
    {
      id: "mug-leaf-hoe",
      category: "mugs",
      print: "leaf-hoe",
      name: "RGA Leaf & Hoe Mug",
      description: "11oz (325ml) cream ceramic mug with the green leaf and hoe badge. Dishwasher-safe – perfect for the shed or meeting tea urn.",
      image: "apparel/mug-leaf-hoe.jpg",
      price: 8.00,
      sizes: ["11oz (325ml)","15oz (440ml)"],
      colours: ["Cream","Sage"]
    },
    {
      id: "mug-dig-deep",
      category: "mugs",
      print: "dig-deep",
      name: "Dig Deep Enamel Mug",
      description: "Lightweight enamel camping mug with the Dig Deep · Ruddington hoe motif. Tough enough for the allotment flask break.",
      image: "apparel/mug-dig-deep.jpg",
      price: 9.50,
      sizes: ["12oz (350ml)"],
      colours: ["Sage","Cream","Navy"]
    },
    {
      id: "apron-leaf-hoe",
      category: "aprons",
      print: "wordmark",
      name: "RGA Canvas Gardening Apron",
      description: "Heavy natural canvas apron with three front tool pockets, adjustable strap and the RGA badge and wordmark. Great for potting, seed sowing and show days.",
      image: "apparel/apron-leaf-hoe.jpg",
      price: 18.00,
      sizes: ["One size (adjustable)"],
      colours: ["Natural","Sage","Terracotta"]
    },
    {
      id: "gloves-rga",
      category: "garden",
      print: "leaf-hoe",
      name: "RGA Gardening Gloves",
      description: "Breathable gardening gloves with grippy palms and an embroidered leaf, hoe and RGA logo on the back.",
      image: "apparel/gloves-rga.jpg",
      price: 7.50,
      sizes: ["S","M","L","XL"],
      colours: ["Sage/Cream","Navy/Cream"]
    },
    {
      id: "beanie-rga",
      category: "garden",
      print: "wordmark",
      name: "Ruddington Knitted Beanie",
      description: "Warm ribbed beanie with a woven Ruddington leaf and trowel patch – for frosty winter digging.",
      image: "apparel/beanie-rga.jpg",
      price: 12.00,
      sizes: ["One size"],
      colours: ["Terracotta","Sage","Navy"]
    }
  ]
};
