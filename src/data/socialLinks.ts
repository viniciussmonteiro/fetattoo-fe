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
    href: "https://instagram.com/ananoirtattoo"
  },
  {
    id: "whatsapp",
    label: "WhatsApp para agendamento",
    shortLabel: "WhatsApp",
    href: "https://wa.me/5511999999999?text=Oi%2C%20Ana%20Noir!%20Quero%20agendar%20uma%20tatuagem."
  },
  {
    id: "email",
    label: "E-mail profissional",
    shortLabel: "E-mail",
    href: "mailto:contato@ananoirtattoo.com.br"
  }
];
