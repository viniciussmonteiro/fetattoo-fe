import type { Metadata } from "next";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

const siteName = "Fernanda Borges";
const defaultSiteUrl = "http://localhost:3000";

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
    "Portfólio profissional da tatuadora Fernanda Borges. Blackwork e Black & Red com atendimento em Pinheiros, SP.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName,
    url: siteUrl,
    title: `${siteName} | Blackwork em Pinheiros, SP`,
    description: "Tatuagens autorais em Blackwork e Black & Red com linguagem visual forte e profissional."
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
