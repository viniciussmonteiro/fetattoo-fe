import { cache } from "react";
import { artistProfile as fallbackArtistProfile, type ArtistProfile } from "@/data/artist";
import { faqItems as fallbackFaqItems, type FAQItem } from "@/data/faq";
import { testimonials as fallbackTestimonials, type Testimonial } from "@/data/testimonials";
import { socialLinks as fallbackSocialLinks, type SocialLink } from "@/data/socialLinks";
import { careBlocks as fallbackCareBlocks, bookingPolicy as fallbackBookingPolicy, type CareBlock } from "@/data/care";
import { requestBackend } from "@/lib/server/backend-request";

type PublicSiteSettings = {
  artistName: string;
  headline: string;
  city: string;
  state: string;
  whatsapp: string;
  email: string;
  instagram: string;
  address: string | null;
  availabilityText: string;
  heroImageUrl: string | null;
  copyrightText: string;
};

type PublicArtistProfile = {
  fullName: string;
  artisticName: string;
  bioShort: string;
  bioLong: string;
  favoriteStyles: string[];
  artInspirations: string[];
  studioName: string;
  city: string;
  profileImageUrl: string | null;
};

type PublicSocialLink = {
  id: number;
  platform: string;
  url: string;
  username: string | null;
  isActive: boolean;
};

type PublicFaqItem = {
  id: number;
  question: string;
  answer: string;
};

type PublicTestimonial = {
  id: number;
  clientName: string;
  clientImageUrl: string | null;
  testimonial: string;
  source: string | null;
};

type PublicCareSection = {
  id: number;
  title: string;
  content: string;
};

type PublicAvailability = {
  title: string;
  description: string;
  bookingNote: string | null;
};

function mapPlatformLabel(platform: string): { label: string; shortLabel: string } {
  const normalized = platform.trim().toLowerCase();

  if (normalized === "instagram") return { label: "Instagram oficial", shortLabel: "Instagram" };
  if (normalized === "whatsapp") return { label: "WhatsApp para agendamento", shortLabel: "WhatsApp" };
  if (normalized === "tiktok") return { label: "TikTok oficial", shortLabel: "TikTok" };
  if (normalized === "threads") return { label: "Threads oficial", shortLabel: "Threads" };

  const shortLabel = platform.charAt(0).toUpperCase() + platform.slice(1);
  return {
    label: `${shortLabel} oficial`,
    shortLabel
  };
}

function toArtistProfile(
  profile: PublicArtistProfile,
  settings: PublicSiteSettings | null,
  socialLinks: SocialLink[]
): ArtistProfile {
  const instagramLink = socialLinks.find((link) => link.id === "instagram")?.href ?? settings?.instagram ?? fallbackArtistProfile.instagramUrl;
  const whatsappLink = socialLinks.find((link) => link.id === "whatsapp")?.href ?? settings?.whatsapp ?? fallbackArtistProfile.whatsappUrl;
  const styles = profile.favoriteStyles?.length ? profile.favoriteStyles : fallbackArtistProfile.favoriteStyles;

  return {
    ...fallbackArtistProfile,
    name: profile.artisticName || profile.fullName || fallbackArtistProfile.name,
    tagline: styles.join(" • "),
    bioShort: profile.bioShort || fallbackArtistProfile.bioShort,
    bioLong: profile.bioLong || fallbackArtistProfile.bioLong,
    city: settings?.state || profile.city || fallbackArtistProfile.city,
    neighborhood: settings?.address || fallbackArtistProfile.neighborhood,
    studioName: profile.studioName || fallbackArtistProfile.studioName,
    availability: settings?.availabilityText || fallbackArtistProfile.availability,
    experienceSummary: fallbackArtistProfile.experienceSummary,
    favoriteStyles: styles,
    inspirations: profile.artInspirations?.length ? profile.artInspirations : fallbackArtistProfile.inspirations,
    email: settings?.email || fallbackArtistProfile.email,
    phone: fallbackArtistProfile.phone,
    whatsappUrl: whatsappLink,
    instagramUrl: instagramLink
  };
}

function toSocialLinks(links: PublicSocialLink[]): SocialLink[] {
  return links
    .filter((link) => link.isActive)
    .map((link) => {
      const mapped = mapPlatformLabel(link.platform);
      return {
        id: link.platform.toLowerCase(),
        href: link.url,
        label: mapped.label,
        shortLabel: mapped.shortLabel
      };
    });
}

const fetchPublicData = cache(async () => {
  const fallback = {
    artistProfile: fallbackArtistProfile,
    socialLinks: fallbackSocialLinks,
    faqItems: fallbackFaqItems,
    testimonials: fallbackTestimonials,
    careBlocks: fallbackCareBlocks,
    bookingPolicy: fallbackBookingPolicy
  };

  try {
    const [settingsRes, profileRes, linksRes, faqRes, testimonialsRes, careRes, availabilityRes] = await Promise.all([
      requestBackend<PublicSiteSettings>({ path: "/api/public/site-settings", next: { revalidate: 60 } }),
      requestBackend<PublicArtistProfile>({ path: "/api/public/artist-profile", next: { revalidate: 60 } }),
      requestBackend<PublicSocialLink[]>({ path: "/api/public/social-links", next: { revalidate: 60 } }),
      requestBackend<PublicFaqItem[]>({ path: "/api/public/faq", next: { revalidate: 60 } }),
      requestBackend<PublicTestimonial[]>({ path: "/api/public/testimonials", next: { revalidate: 60 } }),
      requestBackend<PublicCareSection[]>({ path: "/api/public/care", next: { revalidate: 60 } }),
      requestBackend<PublicAvailability>({ path: "/api/public/availability", next: { revalidate: 60 } })
    ]);

    const socialLinks = linksRes.ok && linksRes.data ? toSocialLinks(linksRes.data) : fallback.socialLinks;

    const artistProfile =
      profileRes.ok && profileRes.data
        ? toArtistProfile(profileRes.data, settingsRes.ok ? settingsRes.data ?? null : null, socialLinks)
        : fallback.artistProfile;

    const faqItems: FAQItem[] =
      faqRes.ok && faqRes.data
        ? faqRes.data.map((item) => ({
            id: item.id,
            question: item.question,
            answer: item.answer
          }))
        : fallback.faqItems;

    const testimonials: Testimonial[] =
      testimonialsRes.ok && testimonialsRes.data
        ? testimonialsRes.data.map((item) => ({
            id: item.id,
            name: item.clientName,
            comment: item.testimonial,
            source: item.source ?? "Depoimento verificado",
            image: item.clientImageUrl ?? undefined
          }))
        : fallback.testimonials;

    const careBlocks: CareBlock[] =
      careRes.ok && careRes.data
        ? careRes.data.map((section) => ({
            id: String(section.id),
            title: section.title,
            items: [section.content]
          }))
        : fallback.careBlocks;

    const bookingPolicy =
      availabilityRes.ok && availabilityRes.data
        ? availabilityRes.data.bookingNote || availabilityRes.data.description || fallback.bookingPolicy
        : fallback.bookingPolicy;

    return {
      artistProfile,
      socialLinks,
      faqItems,
      testimonials,
      careBlocks,
      bookingPolicy
    };
  } catch {
    return fallback;
  }
});

export async function getArtistProfile() {
  const content = await fetchPublicData();
  return content.artistProfile;
}

export async function getFaqItems() {
  const content = await fetchPublicData();
  return content.faqItems;
}

export async function getTestimonials() {
  const content = await fetchPublicData();
  return content.testimonials;
}

export async function getSocialLinks() {
  const content = await fetchPublicData();
  return content.socialLinks;
}

export async function getCareBlocks() {
  const content = await fetchPublicData();
  return content.careBlocks;
}

export async function getBookingPolicy() {
  const content = await fetchPublicData();
  return content.bookingPolicy;
}

