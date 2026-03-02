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
  teachersSectionTitle?: string;
  teachersSectionSubtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtons?: CtaButton[];
}

export interface Teacher {
  _id: string;
  name?: string;
  role?: string;
  shortDescription?: string;
  image?: { asset?: { url: string }; _type?: string };
  order?: number;
}

export interface TeachersPage {
  title?: string;
  intro?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: { asset?: { url: string }; _type?: string };
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
  programCategories[]{ title, description, icon, to },
  whyChooseUsSectionTitle,
  whyChooseUsSectionSubtitle,
  whyChooseUsItems[]{ icon, title, description },
  teachersSectionTitle,
  teachersSectionSubtitle,
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

const TEACHERS_QUERY = `*[_type == "teacher"] | order(order asc, name asc){
  _id,
  name,
  role,
  shortDescription,
  image ${imageProjection}
}`;

const TEACHERS_PAGE_QUERY = `*[_type == "teachersPage"][0]{
  title,
  intro,
  seoTitle,
  seoDescription,
  ogImage ${imageProjection}
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

export async function getTeachers(): Promise<Teacher[]> {
  return sanityClient.fetch<Teacher[]>(TEACHERS_QUERY);
}

export async function getTeachersPage(): Promise<TeachersPage | null> {
  return sanityClient.fetch<TeachersPage | null>(TEACHERS_PAGE_QUERY);
}

// --- Page (template) types and query ---
export interface PageSectionHero {
  _type: 'sectionHero';
  _key: string;
  title?: string;
  subtitle?: string;
  image?: { asset?: { url: string }; _type?: string };
  ctaButtons?: { label: string; to: string }[];
}

export interface PageSectionRichText {
  _type: 'sectionRichText';
  _key: string;
  heading?: string;
  content?: unknown[];
}

export interface PageSectionImage {
  _type: 'sectionImage';
  _key: string;
  image?: { asset?: { url: string }; _type?: string };
  caption?: string;
}

export interface PageSectionImageGallery {
  _type: 'sectionImageGallery';
  _key: string;
  heading?: string;
  images?: { asset?: { url: string }; _type?: string }[];
}

export interface PageSectionProgramListing {
  _type: 'sectionProgramListing';
  _key: string;
  heading?: string;
  subheading?: string;
  limit?: number;
}

export interface PageSectionFormEmbed {
  _type: 'sectionFormEmbed';
  _key: string;
  sectionTitle?: string;
  jotformUrl?: string;
}

export interface PageSectionCta {
  _type: 'sectionCta';
  _key: string;
  title?: string;
  subtitle?: string;
  buttons?: { label: string; to: string }[];
}

export type PageSection =
  | PageSectionHero
  | PageSectionRichText
  | PageSectionImage
  | PageSectionImageGallery
  | PageSectionProgramListing
  | PageSectionFormEmbed
  | PageSectionCta;

export interface TemplatePage {
  _id: string;
  title?: string;
  slug?: string;
  sections?: PageSection[];
}

const PAGE_BY_SLUG_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  sections[]{
    _type,
    _key,
    _type == "sectionHero" => {
      title,
      subtitle,
      image ${imageProjection},
      ctaButtons[]{ label, to }
    },
    _type == "sectionRichText" => { heading, content },
    _type == "sectionImage" => { image ${imageProjection}, caption },
    _type == "sectionImageGallery" => { heading, images[] ${imageProjection} },
    _type == "sectionProgramListing" => { heading, subheading, limit },
    _type == "sectionFormEmbed" => { sectionTitle, jotformUrl },
    _type == "sectionCta" => { title, subtitle, buttons[]{ label, to } }
  }
}`;

export async function getPageBySlug(slug: string): Promise<TemplatePage | null> {
  return sanityClient.fetch<TemplatePage | null>(PAGE_BY_SLUG_QUERY, { slug });
}
