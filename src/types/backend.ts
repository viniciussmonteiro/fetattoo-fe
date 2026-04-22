export type BackendAdminDashboard = {
  totalTattoos: number;
  totalCategories: number;
  totalTestimonials: number;
  totalContactMessages: number;
  totalFaqItems: number;
  totalFeaturedTattoos: number;
};

export type BackendArtistProfile = {
  id: number;
  fullName: string;
  artisticName: string;
  bioShort: string;
  bioLong: string;
  experienceYears: number;
  favoriteStyles: string[];
  artInspirations: string[];
  studioName: string;
  city: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BackendSiteSettings = {
  id: number;
  siteName: string;
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
  heroVideoUrl: string | null;
  copyrightText: string;
  createdAt: string;
  updatedAt: string;
};

export type BackendSocialLink = {
  id: number;
  platform: string;
  url: string;
  username: string | null;
  isActive: boolean;
  sortOrder: number;
};

export type BackendFaqItem = {
  id: number;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BackendTestimonial = {
  id: number;
  clientName: string;
  clientImageUrl: string | null;
  testimonial: string;
  source: string | null;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
};

export type BackendTattooImage = {
  id: number;
  tattooId: number;
  imageUrl: string;
  storagePath: string | null;
  altText: string;
  caption: string | null;
  isCover: boolean;
  sortOrder: number;
  createdAt: string;
};

export type BackendTattooCategory = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
};

export type BackendTattoo = {
  id: number;
  title: string;
  slug: string;
  categoryId: number;
  style: string;
  bodyPart: string;
  technique: string;
  description: string | null;
  healed: boolean;
  fresh: boolean;
  beforeAfter: boolean;
  featuredHome: boolean;
  published: boolean;
  workDate: string | null;
  createdAt: string;
  updatedAt: string;
  category?: BackendTattooCategory;
  images?: BackendTattooImage[];
};

export type BackendContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  desiredStyle: string | null;
  message: string;
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
  createdAt: string;
};

