export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: string;
  avatar: string;
  image: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "emma",
    name: "EMMA RODRIGUEZ",
    role: "Graphic Designer",
    quote:
      "Every sip feels incredibly fresh, light, and perfect for sunny afternoons with friends.",
    rating: "5 / 5",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-1iwbLO-UPJV9i9uNM8rCO6aBeyS_ixeNrkg9a8nKnVOR8t_nD5u7_L85mwM6FZFGnkzFsbOQJ4VAekhGuy7cniYiv3INtXMFuwLoRgEOiAe-JYd5-IAWLyJXTN0NSZ6RBW6h6ZJvfyEFtubEGR0FK-2cg9KREGivXSmKjXGND_vUEQ0FNW8vvb-s4zfy_2_hZbN8Oz-yCyeQFF8vl9-Vp1muXhb2JFubTk_Hs_F0",
  },
  {
    id: "daniel",
    name: "DANIEL KIM",
    role: "Content Creator",
    quote:
      "Bright flavors, crisp bubbles, and zero boredom. Exactly what refreshing should taste.",
    rating: "5 / 5",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4Wj3uwWtEUI4VEnAKS0ETpOcfY22UFkH4C2Jry9BOrK01GHXF_6qkz7KjvDA8sXXzD6Zm5iwdQGg2z8M2JCkxruostD_UCDg1__HXcu0LYkYImI4sI5Y3bdXOzxTKxEgB7hPYgObQwqRa-0BU-Vyfd7TyWyGcfW2-d1yDFgWdWkEjHwU8FFARad6lBmp28dDcJMmq9d3432PaffkbW89XJIu36eIIQ-eXNnPWsaMu",
  },
  {
    id: "ethan",
    name: "ETHAN WALKER",
    role: "Photographer",
    quote:
      "Fresh ingredients and bubble that instantly make every moment feel brighter.",
    rating: "5 / 5",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9JFUg_sY4UUZEuDqI8XlDBMUOb8hTTk3o77qEFYzoOi4F3_LWvrWNB2HjVy-mpwUWBq7Z-eo9RtDkYa75l26I2IfBUn_py9Z-YOGTVwmWTMiDNQD4YaRLw1v7GiknBWEYzb43BquXTmkRJgfgbMH0KWmtjMvQn6l39AhqNGTYtjD7cCh74LajeE04_BwiGNKj0HR2nANmp6O62OxDacsj8RBgZ6HgVm-igePzpOmn",
  },
];

