import type { Metadata } from "next";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

const siteName = "Ana Noir Tattoo";
const defaultSiteUrl = "https://ananoirtattoo.com";

function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configured) {
    return defaultSiteUrl;
  }

  try {
    return new URL(configured).toString();
  } catch {
    return defaultSiteUrl;
  }
}

const siteUrl = resolveSiteUrl();

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
    description: "Tatuagens autorais com traço delicado, composição elegante e identidade artística."
  },
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  }
};

export function createPageMetadata({ title, description, path = "/", noIndex = false }: MetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    robots: {
      index: !noIndex,
      follow: !noIndex
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: path
    }
  };
}
