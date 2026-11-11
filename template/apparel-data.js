/* Example club apparel. Photos are samples — swap the image files for your own prints.
   See CUSTOMISE.md. Prices are examples. Nothing is charged. */
window.RGA_APPAREL = {
  demo: true,
  note: "Demo catalogue – not real ordering. No payment is taken.",
  profitsNote: "All profits go to supporting Your Gardening Association.",
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
    { id: "leaf-hoe", label: "Example leaf and hoe badge" },
    { id: "wordmark", label: "Example club wordmark" },
    { id: "dig-deep", label: "Example Dig Deep motif" },
    { id: "since-1934", label: "Example founding-year line" }
  ],
  sizesWear: ["S", "M", "L", "XL", "XXL"],
  products: [
    {
      id: "tee-leaf-hoe",
      category: "tees",
      print: "leaf-hoe",
      name: "Leaf & Hoe Tee",
      description: "Example cotton tee with a leaf and hoe badge. Swap this photo for your own club print.",
      image: "apparel/tee-leaf-hoe.jpg",
      price: 16.00,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colours: ["Cream", "Sage", "Navy", "Terracotta"]
    },
    {
      id: "tee-wordmark",
      category: "tees",
      print: "wordmark",
      name: "Club Wordmark Tee",
      description: "Example tee with a club name across the chest. Replace the picture and the wording with yours.",
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
      description: "Example tee with a hoe motif. The sample photo is a placeholder for your own design.",
      image: "apparel/tee-dig-deep.jpg",
      price: 16.00,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colours: ["Navy", "Cream", "Sage", "Terracotta"]
    },
    {
      id: "tee-since-1934",
      category: "tees",
      print: "since-1934",
      name: "Founded Here Tee",
      description: "Example founding-year tee. Change the name to your own year and replace the photo.",
      image: "apparel/tee-since-1934.jpg",
      price: 16.00,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colours: ["Terracotta", "Cream", "Sage", "Navy"]
    },
    {
      id: "hoodie-leaf-hoe",
      category: "hoodies",
      print: "leaf-hoe",
      name: "Leaf & Hoe Hoodie",
      description: "Example hoodie with the leaf and hoe badge. Swap the photo for your print.",
      image: "apparel/hoodie-leaf-hoe.jpg",
      price: 32.00,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colours: ["Sage", "Cream", "Navy", "Terracotta"]
    },
    {
      id: "hoodie-wordmark",
      category: "hoodies",
      print: "wordmark",
      name: "Club Wordmark Hoodie",
      description: "Example hoodie with a club wordmark. Replace the picture before you take real orders.",
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
      description: "Example hoodie with a hoe motif. The sample photo is not your club's artwork.",
      image: "apparel/hoodie-dig-deep.jpg",
      price: 32.00,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colours: ["Terracotta", "Navy", "Sage", "Cream"]
    },
    {
      id: "cap-leaf-hoe",
      category: "caps",
      print: "leaf-hoe",
      name: "Leaf & Hoe Cap",
      description: "Example cap with a leaf and hoe badge. One size with an adjustable strap in this demo.",
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
      description: "Example cap. Replace the photo with your own embroidery or print.",
      image: "apparel/cap-dig-deep.jpg",
      price: 12.00,
      sizes: ["One size"],
      colours: ["Navy", "Sage", "Cream"]
    },
    {
      id: "tote-leaf-hoe",
      category: "totes",
      print: "leaf-hoe",
      name: "Leaf & Hoe Tote",
      description: "Example canvas tote. Useful for seed packets and produce swaps once you add your own print.",
      image: "apparel/tote-leaf-hoe.jpg",
      price: 10.00,
      sizes: ["One size"],
      colours: ["Natural", "Sage", "Navy"]
    },
    {
      id: "tote-wordmark",
      category: "totes",
      print: "wordmark",
      name: "Club Wordmark Tote",
      description: "Example tote with a club name. Swap the picture for your wordmark.",
      image: "apparel/tote-wordmark.jpg",
      price: 10.00,
      sizes: ["One size"],
      colours: ["Cream", "Natural", "Navy"]
    },
    {
      id: "tote-since-1934",
      category: "totes",
      print: "since-1934",
      name: "Founded Here Tote",
      description: "Example founding-year tote. Change the year in the name and replace the photo.",
      image: "apparel/tote-since-1934.jpg",
      price: 10.00,
      sizes: ["One size"],
      colours: ["Navy", "Natural", "Cream"]
    },
    {
      id: "mug-leaf-hoe",
      category: "mugs",
      print: "leaf-hoe",
      name: "Leaf & Hoe Mug",
      description: "Example mug for the meeting tea urn. Replace the photo with your badge.",
      image: "apparel/mug-leaf-hoe.jpg",
      price: 8.00,
      sizes: ["11oz (325ml)", "15oz (440ml)"],
      colours: ["Cream", "Sage"]
    },
    {
      id: "mug-dig-deep",
      category: "mugs",
      print: "dig-deep",
      name: "Dig Deep Enamel Mug",
      description: "Example enamel mug for the plot. The sample photo is a placeholder.",
      image: "apparel/mug-dig-deep.jpg",
      price: 9.50,
      sizes: ["12oz (350ml)"],
      colours: ["Sage", "Cream", "Navy"]
    },
    {
      id: "apron-leaf-hoe",
      category: "aprons",
      print: "wordmark",
      name: "Canvas Gardening Apron",
      description: "Example apron with pockets. Swap the photo before you show it as your club kit.",
      image: "apparel/apron-leaf-hoe.jpg",
      price: 18.00,
      sizes: ["One size (adjustable)"],
      colours: ["Natural", "Sage", "Terracotta"]
    },
    {
      id: "gloves-rga",
      category: "garden",
      print: "leaf-hoe",
      name: "Club Gardening Gloves",
      description: "Example gloves. Replace the photo with your own, or delete this product if you do not sell gloves.",
      image: "apparel/gloves-rga.jpg",
      price: 7.50,
      sizes: ["S", "M", "L", "XL"],
      colours: ["Sage/Cream", "Navy/Cream"]
    },
    {
      id: "beanie-rga",
      category: "garden",
      print: "wordmark",
      name: "Club Knitted Beanie",
      description: "Example beanie for winter digging. Replace the photo and the name.",
      image: "apparel/beanie-rga.jpg",
      price: 12.00,
      sizes: ["One size"],
      colours: ["Terracotta", "Sage", "Navy"]
    }
  ]
};
