import { artistProfile } from "@/data/artist";
import { faqItems } from "@/data/faq";
import { testimonials } from "@/data/testimonials";
import { socialLinks } from "@/data/socialLinks";

export async function getArtistProfile() {
  return artistProfile;
}

export async function getFaqItems() {
  return faqItems;
}

export async function getTestimonials() {
  return testimonials;
}

export async function getSocialLinks() {
  return socialLinks;
}
