export interface Flavor {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  tag: string;
  image: string;
  bgTone?: string;
  description?: string;
  tasteNotes?: Array<{
    name: string;
    type: "circle" | "arrow" | "star";
    color: string;
  }>;
}

export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export const FLAVORS_DATA: Flavor[] = [
  {
    id: "kiwi-pop",
    name: "KIWI POP",
    price: 28000,
    formattedPrice: "Rp 28.000",
    tag: "FUN",
    image:
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    bgTone: "#e0f1fc",
    tasteNotes: [
      { name: "KIWI", type: "circle", color: "#82c91e" },
      { name: "TANGY", type: "arrow", color: "#e69b00" },
      { name: "SPARKLING", type: "star", color: "#82c91e" },
    ],
  },
  {
    id: "lime-rush",
    name: "LIME RUSH",
    price: 28000,
    formattedPrice: "Rp 28.000",
    tag: "FRESH",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    bgTone: "#e0f1fc",
    tasteNotes: [
      { name: "LIME", type: "circle", color: "#82c91e" },
      { name: "ZEST", type: "arrow", color: "#e69b00" },
      { name: "SPARKLING", type: "star", color: "#82c91e" },
    ],
  },
  {
    id: "melon-burst",
    name: "MELON BURST",
    price: 32000,
    formattedPrice: "Rp 32.000",
    tag: "HAPPY",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    bgTone: "#e0f1fc",
    tasteNotes: [
      { name: "HONEYDEW", type: "circle", color: "#82c91e" },
      { name: "SWEET", type: "arrow", color: "#e69b00" },
      { name: "SPARKLING", type: "star", color: "#82c91e" },
    ],
  },
  {
    id: "coconut-breeze",
    name: "COCONUT BREEZE",
    price: 30000,
    formattedPrice: "Rp 30.000",
    tag: "TROPICAL",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBknECjab9xvKrqqeifclw9Ebqn420ofq7lU_izNMckrzvUDRUkmizTC4L4yPkoXJyf5qUOOdBP8OcdY9fTJFIqdKyzqToqlXbe_G7-S5yoWeCgRTfih2v83YtnBiO_Lhlf7hKETwWPbU5gU36JrkCkLev7hDN7F6UOE6PAiduR5721b-m0COtEDKfVlklboATbAaBLj_q5LfTGXhoJqjsj8xe2sde7nvNRZxx2H_7y",
    bgTone: "#e0f1fc",
    tasteNotes: [
      { name: "COCONUT", type: "circle", color: "#82c91e" },
      { name: "CRISP", type: "arrow", color: "#e69b00" },
      { name: "SPARKLING", type: "star", color: "#82c91e" },
    ],
  },
  {
    id: "coconut-lime",
    name: "COCONUT LIME",
    price: 32000,
    formattedPrice: "Rp 32.000",
    tag: "EXOTIC",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDl63BkAH-hsrDQT9cc2JUpP7BhgdTrAb4W8sZBJ7vCfhRDCMEMtETUt4v09h2TVfqOTXONWPa6PdzwdkXZn2sSissHmPtl90X3Rdygvtxp8sJ8Y2sAa4X1vj0IqxV-RUTRG000Ci1ar9KXS99uPWhg_t29qFNuwxHBsFJ1vKqeteBGvZj8W2MrW7HqPrBebmjOD_wxC6KyvOJ0tNvSrHSH4woC0PaERpOMoZMXLnmB",
    bgTone: "#e0f1fc",
    tasteNotes: [
      { name: "LIME CRUSH", type: "circle", color: "#82c91e" },
      { name: "EXOTIC", type: "arrow", color: "#e69b00" },
      { name: "SPARKLING", type: "star", color: "#82c91e" },
    ],
  },
  {
    id: "toasted-coconut",
    name: "TOASTED COCONUT",
    price: 35000,
    formattedPrice: "Rp 35.000",
    tag: "TOASTED",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2p2YFEDDq4d55DdqJfHPMF9kHty8hiB2I7QVL0TGj55sgAjnE2fBDj0N37V7JG0IidMYxDpJ1146oJSNY77ezxlrlLJdmOJittPhNrR-9fxHn7dApPhol50hS1TsqgiLtfMH5G1BBLPk-DIsGRme5ER9v0A5DMnt4wfnya4ysiwGJrIPaMk1CkJHXhq7rPOEcQ17bXGN0rbEvuLLsKAdF3rCYOTkB8zTTbgVnJRJj",
    bgTone: "#e0f1fc",
    tasteNotes: [
      { name: "ROASTED", type: "circle", color: "#82c91e" },
      { name: "RICH", type: "arrow", color: "#e69b00" },
      { name: "SPARKLING", type: "star", color: "#82c91e" },
    ],
  },
];

export const SPOTLIGHT_PRODUCTS = [
  {
    id: "matcha-fizz",
    name: "MATCHA FIZZ",
    price: 35000,
    formattedPrice: "Rp 35.000",
    tag: "FOCUS",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZx8-TNdRW9rcv6W2gqtenGl1xmX4yoBiMfEgJ_mWuCtNkXRrbR0wcsQGJhSlFnIcV0oI9T4WA-bnuQv68boKdA2RfQpkQeIdWWL4hI324V96-DV816uaiIz81zIpwzwnIGD53MpqebGgAA23txIi1wUxB-S8wlYxyo6BVId-XaGWXZp52a1stnS3o3xU5yeG7JTpPUi7Gte7nbXugHlfNA6x3vFYfErlYzjgnXDlIhq7-2UeYWplMNQ",
    bgImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXDyzDHFhD00YtH4oJYHB4Bm2KnLWgCnIpCfZB6GgrsuvHAaKAhO0zGAjW3abKCOwN48NJXC2aQBGBWGBgI3SIvDI5njvegSekxJVTxu1RwqT0IcSKa0amVs3NtMvP7YnYvkZZURu04W-12oEOPLAwMHOFq6VNPOApTbpbJ0P9jW21ElqmRA26mO_8fzoR9kvLCGvfWxH2fSAPQNPsVh5kZy5JMoOe-kSgBsjygC62",
    headline: "WHEN THE SUN FINDS\nYOU, BRING ZESTO.",
    scriptAccent: "Not Just a Drink",
    description:
      "Earthy matcha lifted by sparkling citrus bubbles. Smooth, bright, and made for moments that need a little extra focus.",
    tasteNotes: [
      { label: "MATCHA", type: "circle", color: "#82c91e" },
      { label: "CITRUS", type: "arrow", color: "#e69b00" },
      { label: "SPARKLING", type: "star", color: "#82c91e" },
    ],
  },
  {
    id: "lime-rush",
    name: "LIME RUSH",
    price: 28000,
    formattedPrice: "Rp 28.000",
    tag: "FRESH",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZx8-TNdRW9rcv6W2gqtenGl1xmX4yoBiMfEgJ_mWuCtNkXRrbR0wcsQGJhSlFnIcV0oI9T4WA-bnuQv68boKdA2RfQpkQeIdWWL4hI324V96-DV816uaiIz81zIpwzwnIGD53MpqebGgAA23txIi1wUxB-S8wlYxyo6BVId-XaGWXZp52a1stnS3o3xU5yeG7JTpPUi7Gte7nbXugHlfNA6x3vFYfErlYzjgnXDlIhq7-2UeYWplMNQ",
    bgImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXDyzDHFhD00YtH4oJYHB4Bm2KnLWgCnIpCfZB6GgrsuvHAaKAhO0zGAjW3abKCOwN48NJXC2aQBGBWGBgI3SIvDI5njvegSekxJVTxu1RwqT0IcSKa0amVs3NtMvP7YnYvkZZURu04W-12oEOPLAwMHOFq6VNPOApTbpbJ0P9jW21ElqmRA26mO_8fzoR9kvLCGvfWxH2fSAPQNPsVh5kZy5JMoOe-kSgBsjygC62",
    headline: "CITRUS BURST IN\nEVERY SINGLE SIP.",
    scriptAccent: "Pure Refreshment",
    description:
      "Real Persian lime extract combined with fine effervescence. Crisp, thirst-quenching, and packed with invigorating zest.",
    tasteNotes: [
      { label: "LIME", type: "circle", color: "#82c91e" },
      { label: "CITRUS", type: "arrow", color: "#e69b00" },
      { label: "SPARKLING", type: "star", color: "#82c91e" },
    ],
  },
  {
    id: "kiwi-pop",
    name: "KIWI POP",
    price: 28000,
    formattedPrice: "Rp 28.000",
    tag: "FUN",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZx8-TNdRW9rcv6W2gqtenGl1xmX4yoBiMfEgJ_mWuCtNkXRrbR0wcsQGJhSlFnIcV0oI9T4WA-bnuQv68boKdA2RfQpkQeIdWWL4hI324V96-DV816uaiIz81zIpwzwnIGD53MpqebGgAA23txIi1wUxB-S8wlYxyo6BVId-XaGWXZp52a1stnS3o3xU5yeG7JTpPUi7Gte7nbXugHlfNA6x3vFYfErlYzjgnXDlIhq7-2UeYWplMNQ",
    bgImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXDyzDHFhD00YtH4oJYHB4Bm2KnLWgCnIpCfZB6GgrsuvHAaKAhO0zGAjW3abKCOwN48NJXC2aQBGBWGBgI3SIvDI5njvegSekxJVTxu1RwqT0IcSKa0amVs3NtMvP7YnYvkZZURu04W-12oEOPLAwMHOFq6VNPOApTbpbJ0P9jW21ElqmRA26mO_8fzoR9kvLCGvfWxH2fSAPQNPsVh5kZy5JMoOe-kSgBsjygC62",
    headline: "PLAYFUL KIWI WITH\nBOLD BUBBLE VIBES.",
    scriptAccent: "Summer In A Can",
    description:
      "Tart green kiwi paired with natural cane sweetness and micro-bubbles that dance on your tongue with every splash.",
    tasteNotes: [
      { label: "KIWI", type: "circle", color: "#82c91e" },
      { label: "TANGY", type: "arrow", color: "#e69b00" },
      { label: "SPARKLING", type: "star", color: "#82c91e" },
    ],
  },
  {
    id: "coconut-breeze",
    name: "COCONUT BREEZE",
    price: 30000,
    formattedPrice: "Rp 30.000",
    tag: "TROPICAL",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZx8-TNdRW9rcv6W2gqtenGl1xmX4yoBiMfEgJ_mWuCtNkXRrbR0wcsQGJhSlFnIcV0oI9T4WA-bnuQv68boKdA2RfQpkQeIdWWL4hI324V96-DV816uaiIz81zIpwzwnIGD53MpqebGgAA23txIi1wUxB-S8wlYxyo6BVId-XaGWXZp52a1stnS3o3xU5yeG7JTpPUi7Gte7nbXugHlfNA6x3vFYfErlYzjgnXDlIhq7-2UeYWplMNQ",
    bgImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXDyzDHFhD00YtH4oJYHB4Bm2KnLWgCnIpCfZB6GgrsuvHAaKAhO0zGAjW3abKCOwN48NJXC2aQBGBWGBgI3SIvDI5njvegSekxJVTxu1RwqT0IcSKa0amVs3NtMvP7YnYvkZZURu04W-12oEOPLAwMHOFq6VNPOApTbpbJ0P9jW21ElqmRA26mO_8fzoR9kvLCGvfWxH2fSAPQNPsVh5kZy5JMoOe-kSgBsjygC62",
    headline: "COASTAL ESCAPE IN\nA CHILLED SLIM CAN.",
    scriptAccent: "Island Born",
    description:
      "Tender coconut water essence with a fizzy kick. Light, replenishing, and naturally low-calorie for sunny outdoor adventures.",
    tasteNotes: [
      { label: "COCONUT", type: "circle", color: "#82c91e" },
      { label: "CRISP", type: "arrow", color: "#e69b00" },
      { label: "SPARKLING", type: "star", color: "#82c91e" },
    ],
  },
];
