export type SocialLink = {
  id: string;
  label: string;
  href: string;
  shortLabel: string;
};

export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram oficial",
    shortLabel: "Instagram",
    href: "https://www.instagram.com/fe.borgesink/"
  },
  {
    id: "whatsapp",
    label: "WhatsApp para agendamento",
    shortLabel: "WhatsApp",
    href: "https://api.whatsapp.com/message/R4LIOWS74LHWP1?autoload=1&app_absent=0&utm_source=ig"
  },
  {
    id: "tiktok",
    label: "TikTok oficial",
    shortLabel: "TikTok",
    href: "https://www.tiktok.com/@fe.borgesink"
  },
  {
    id: "threads",
    label: "Threads oficial",
    shortLabel: "Threads",
    href: "https://www.threads.com/@fe.borgesink?xmt=AQF0YkYKPf268JqfYjS9bSKqjNZYUVfv0-EtTXH4dBzUuKA"
  }
];
