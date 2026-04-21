import type { Metadata } from "next";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

const siteName = "Ana Noir Tattoo";
const siteUrl = "https://ananoirtattoo.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Portfólio de Tatuagem em São Paulo`,
    template: `%s | ${siteName}`
  },
  description:
    "Portfólio profissional da tatuadora Ana Noir Tattoo. Fine line, blackwork e floral com atendimento personalizado em São Paulo.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName,
    url: siteUrl,
    title: `${siteName} | Portfólio de Tatuagem em São Paulo`,
    description:
      "Tatuagens autorais com traço delicado, composição elegante e identidade artística."
  },
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  }
};

export function createPageMetadata({ title, description, path = "/" }: MetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: path
    }
  };
}
