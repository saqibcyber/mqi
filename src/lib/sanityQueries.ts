import { sanityClient } from './sanity';

// Reusable GROQ fragments
const imageProjection = `{ _type, asset->{ _id, url }, hotspot, crop }`;

// --- Types (aligned with Sanity schemas) ---
export interface NavLink {
  label: string;
  to: string;
}

export interface SiteSettings {
  navLinks?: NavLink[];
  footerTagline?: string;
  footerQuickLinks?: NavLink[];
  footerProgramLinks?: NavLink[];
  footerAddress?: string;
  footerPhone?: string;
  footerEmail?: string;
  footerCopyright?: string;
}

export interface HomeProgramCategory {
  title: string;
  description: string;
  icon: string;
  to?: string;
  categorySlug?: string;
}

export interface WhyChooseUsItem {
  icon: string;
  title: string;
  description: string;
}

export interface CtaButton {
  label: string;
  to: string;
  variant?: 'primary' | 'accent';
}

export interface Homepage {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaButtons?: CtaButton[];
  programsSectionTitle?: string;
  programsSectionSubtitle?: string;
  programCategories?: HomeProgramCategory[];
  whyChooseUsSectionTitle?: string;
  whyChooseUsSectionSubtitle?: string;
  whyChooseUsItems?: WhyChooseUsItem[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtons?: CtaButton[];
}

export interface ProgramCategoryRef {
  slug: string;
  title: string;
  ages?: string;
  schedule?: string;
}

export interface ProgramCategory {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  icon?: string;
  programs?: ProgramCategoryRef[];
}

export interface ProgramFAQ {
  q?: string;
  a?: string;
}

export interface Program {
  _id: string;
  slug: string;
  title: string;
  category?: { _id: string; title: string; slug?: string };
  mainImage?: { asset?: { url: string }; _type?: string };
  shortDescription?: string;
  overview?: string;
  audience?: string;
  schedule?: string;
  scheduleContent?: unknown[];
  curriculum?: string[];
  fees?: string;
  jotformUrl?: string;
  jotformId?: string;
  faqs?: ProgramFAQ[];
}

export interface ProgramForListing extends Program {
  category?: { _id: string; title: string; slug: string };
}

export interface ProgramsPage {
  title?: string;
  subtitle?: string;
}

export interface BlogPostListItem {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: { asset?: { url: string } };
}

export interface BlogPostFull extends BlogPostListItem {
  category?: string;
  author?: string;
  body?: unknown[];
}

export interface BlogPage {
  title?: string;
  subtitle?: string;
}

export interface CareerRole {
  _id: string;
  title: string;
  type: string;
  icon?: string;
  location?: string;
  description?: string;
  requirements?: string[];
  jotformLink?: string;
}

export interface CareersPage {
  title?: string;
  subtitle?: string;
  applyFormTitle?: string;
  formFields?: {
    nameLabel?: string;
    namePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    phoneLabel?: string;
    phonePlaceholder?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    submitLabel?: string;
  };
}

export interface ContactInfoItem {
  type: string;
  title?: string;
  content?: string;
}

export interface ContactPage {
  title?: string;
  subtitle?: string;
  jotformUrl?: string;
  formTitle?: string;
  formFields?: {
    nameLabel?: string;
    namePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    subjectLabel?: string;
    subjectPlaceholder?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    submitLabel?: string;
  };
  contactInfo?: ContactInfoItem[];
  mapEmbedUrl?: string;
}

export interface DonateTrustBullet {
  title?: string;
  desc?: string;
}

export interface DonatePage {
  title?: string;
  subtitle?: string;
  trustBullets?: DonateTrustBullet[];
  jotformDonateUrl?: string;
  donateFormTitle?: string;
  jotformSponsorStudentUrl?: string;
  sponsorFormTitle?: string;
}

export interface AboutTeacher {
  name: string;
  role?: string;
  oneLineDescription?: string;
  photo?: { asset?: { url: string } };
}

export interface AboutGraduate {
  name: string;
  title?: string;
  yearOfGraduation?: string;
  photo?: { asset?: { url: string } };
}

export interface AboutPage {
  title?: string;
  subtitle?: string;
  instituteText?: string;
  heroImage?: { asset?: { url: string } };
  teachers?: AboutTeacher[];
  graduates?: AboutGraduate[];
}

// --- GROQ Queries ---
const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  navLinks[]{ label, to },
  footerTagline,
  footerQuickLinks[]{ label, to },
  footerProgramLinks[]{ label, to },
  footerAddress,
  footerPhone,
  footerEmail,
  footerCopyright
}`;

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  heroCtaButtons[]{ label, to, variant },
  programsSectionTitle,
  programsSectionSubtitle,
  programCategories[]{ title, description, icon, to, "categorySlug": programCategory->slug.current },
  whyChooseUsSectionTitle,
  whyChooseUsSectionSubtitle,
  whyChooseUsItems[]{ icon, title, description },
  ctaTitle,
  ctaSubtitle,
  ctaButtons[]{ label, to, variant }
}`;

const PROGRAMS_PAGE_QUERY = `*[_type == "programsPage"][0]{ title, subtitle }`;

const PROGRAM_CATEGORIES_QUERY = `*[_type == "programCategory"] | order(title asc){
  _id,
  "slug": slug.current,
  title,
  description,
  icon,
  programs[]{ slug, title, ages, schedule }
}`;

const PROGRAMS_FOR_LISTING_QUERY = `*[_type == "program"] | order(category->title asc, title asc){
  _id,
  "slug": slug.current,
  title,
  shortDescription,
  audience,
  schedule,
  mainImage ${imageProjection},
  "category": category->{ _id, title, "slug": slug.current }
}`;

const PROGRAM_BY_SLUG_QUERY = `*[_type == "program" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  category->{ _id, title },
  mainImage ${imageProjection},
  shortDescription,
  overview,
  audience,
  schedule,
  scheduleContent,
  curriculum,
  fees,
  jotformUrl,
  jotformId,
  faqs[]{ q, a }
}`;

const BLOG_PAGE_QUERY = `*[_type == "blogPage"][0]{ title, subtitle }`;

const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc){
  _id,
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  mainImage ${imageProjection}
}`;

const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  mainImage ${imageProjection},
  category,
  author,
  body
}`;

const CAREERS_PAGE_QUERY = `*[_type == "careersPage"][0]{
  title,
  subtitle,
  applyFormTitle,
  formFields{
    nameLabel,
    namePlaceholder,
    emailLabel,
    emailPlaceholder,
    phoneLabel,
    phonePlaceholder,
    messageLabel,
    messagePlaceholder,
    submitLabel
  }
}`;

const CAREER_ROLES_QUERY = `*[_type == "careerRole"] | order(title asc){
  _id,
  title,
  type,
  icon,
  location,
  description,
  requirements,
  jotformLink
}`;

const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0]{
  title,
  subtitle,
  jotformUrl,
  formTitle,
  formFields{
    nameLabel,
    namePlaceholder,
    emailLabel,
    emailPlaceholder,
    subjectLabel,
    subjectPlaceholder,
    messageLabel,
    messagePlaceholder,
    submitLabel
  },
  contactInfo[]{ type, title, content },
  mapEmbedUrl
}`;

const DONATE_PAGE_QUERY = `*[_type == "donatePage"][0]{
  title,
  subtitle,
  trustBullets[]{ title, desc },
  jotformDonateUrl,
  donateFormTitle,
  jotformSponsorStudentUrl,
  sponsorFormTitle
}`;

const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  title,
  subtitle,
  instituteText,
  heroImage ${imageProjection},
  teachers[]{
    name,
    role,
    oneLineDescription,
    photo ${imageProjection}
  },
  graduates[]{
    name,
    title,
    yearOfGraduation,
    photo ${imageProjection}
  }
}`;

// --- Fetch functions ---
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
}

export async function getHomepage(): Promise<Homepage | null> {
  return sanityClient.fetch<Homepage | null>(HOMEPAGE_QUERY);
}

export async function getProgramsPage(): Promise<ProgramsPage | null> {
  return sanityClient.fetch<ProgramsPage | null>(PROGRAMS_PAGE_QUERY);
}

export async function getProgramCategories(): Promise<ProgramCategory[]> {
  return sanityClient.fetch<ProgramCategory[]>(PROGRAM_CATEGORIES_QUERY);
}

export async function getProgramsForListing(): Promise<ProgramForListing[]> {
  return sanityClient.fetch<ProgramForListing[]>(PROGRAMS_FOR_LISTING_QUERY);
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  return sanityClient.fetch<Program | null>(PROGRAM_BY_SLUG_QUERY, { slug });
}

export async function getBlogPage(): Promise<BlogPage | null> {
  return sanityClient.fetch<BlogPage | null>(BLOG_PAGE_QUERY);
}

export async function getBlogPosts(): Promise<BlogPostListItem[]> {
  return sanityClient.fetch<BlogPostListItem[]>(BLOG_POSTS_QUERY);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostFull | null> {
  return sanityClient.fetch<BlogPostFull | null>(BLOG_POST_BY_SLUG_QUERY, { slug });
}

export async function getCareersPage(): Promise<CareersPage | null> {
  return sanityClient.fetch<CareersPage | null>(CAREERS_PAGE_QUERY);
}

export async function getCareerRoles(): Promise<CareerRole[]> {
  return sanityClient.fetch<CareerRole[]>(CAREER_ROLES_QUERY);
}

export async function getContactPage(): Promise<ContactPage | null> {
  return sanityClient.fetch<ContactPage | null>(CONTACT_PAGE_QUERY);
}

export async function getDonatePage(): Promise<DonatePage | null> {
  return sanityClient.fetch<DonatePage | null>(DONATE_PAGE_QUERY);
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return sanityClient.fetch<AboutPage | null>(ABOUT_PAGE_QUERY);
}
