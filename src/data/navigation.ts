export const primaryNav = [
  { label: "Developments", to: "/developments" },
  { label: "Record", to: "/record" },
  { label: "About", to: "/about" },
  { label: "Locations", to: "/locations" },
  { label: "Contact", to: "/contact" },
] as const;

// Contact is the footer's primary action, so it is rendered as a button rather
// than repeated in the link list.
export const footerNav = primaryNav.filter((item) => item.to !== "/contact");

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
] as const;
