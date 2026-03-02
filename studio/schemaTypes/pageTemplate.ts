import { defineType, defineField, defineArrayMember } from 'sanity';

const imageProjection = { type: 'image', options: { hotspot: true } };

// --- Section block types for flexible page content ---

export const sectionHero = defineType({
  name: 'sectionHero',
  type: 'object',
  title: 'Hero',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle' }),
    defineField({ name: 'image', type: 'image', title: 'Background / Header Image', options: { hotspot: true } }),
    defineField({
      name: 'ctaButtons',
      type: 'array',
      title: 'Buttons',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() }),
            defineField({ name: 'to', type: 'string', title: 'Link (path or URL)', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'label' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Button' }) },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Hero', subtitle: 'Hero section' }) },
});

export const sectionRichText = defineType({
  name: 'sectionRichText',
  type: 'object',
  title: 'Text (Rich)',
  fields: [
    defineField({ name: 'heading', type: 'string', title: 'Heading' }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }],
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Text', subtitle: 'Rich text section' }) },
});

export const sectionImage = defineType({
  name: 'sectionImage',
  type: 'object',
  title: 'Image',
  fields: [
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'caption', type: 'string', title: 'Caption' }),
  ],
  preview: { select: { media: 'image' }, prepare: () => ({ title: 'Image', subtitle: 'Single image' }) },
});

export const sectionImageGallery = defineType({
  name: 'sectionImageGallery',
  type: 'object',
  title: 'Image Gallery',
  fields: [
    defineField({ name: 'heading', type: 'string', title: 'Heading' }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Gallery', subtitle: 'Image gallery' }) },
});

export const sectionProgramListing = defineType({
  name: 'sectionProgramListing',
  type: 'object',
  title: 'Program Listing',
  fields: [
    defineField({ name: 'heading', type: 'string', title: 'Heading', initialValue: 'Our Programs' }),
    defineField({ name: 'subheading', type: 'text', title: 'Subheading' }),
    defineField({
      name: 'limit',
      type: 'number',
      title: 'Max programs to show',
      description: 'Leave empty to show all.',
      validation: (r) => r.min(1).max(50),
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Program Listing', subtitle: 'Program cards' }) },
});

export const sectionFormEmbed = defineType({
  name: 'sectionFormEmbed',
  type: 'object',
  title: 'Form (Jotform)',
  fields: [
    defineField({ name: 'sectionTitle', type: 'string', title: 'Section Title', initialValue: 'Form' }),
    defineField({
      name: 'jotformUrl',
      type: 'string',
      title: 'Jotform URL',
      description: 'Full URL (e.g. https://form.jotform.com/123456789) or form ID only. Editable here without code changes.',
    }),
  ],
  preview: { select: { title: 'sectionTitle' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Form', subtitle: 'Jotform embed' }) },
});

export const sectionCta = defineType({
  name: 'sectionCta',
  type: 'object',
  title: 'Call to Action',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle' }),
    defineField({
      name: 'buttons',
      type: 'array',
      title: 'Buttons',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() }),
            defineField({ name: 'to', type: 'string', title: 'Link', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'label' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Button' }) },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'CTA', subtitle: 'Call to action' }) },
});

// --- Page document (slug-based, flexible sections) ---

export const page = defineType({
  name: 'page',
  type: 'document',
  title: 'Page (Template)',
  description: 'Create new pages with flexible sections. Slug is used for the URL (e.g. about, events).',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'Used in the URL: /page/your-slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      description: 'Add, remove, or reorder sections. Each section type has its own editable fields.',
      of: [
        defineArrayMember({ type: 'sectionHero' }),
        defineArrayMember({ type: 'sectionRichText' }),
        defineArrayMember({ type: 'sectionImage' }),
        defineArrayMember({ type: 'sectionImageGallery' }),
        defineArrayMember({ type: 'sectionProgramListing' }),
        defineArrayMember({ type: 'sectionFormEmbed' }),
        defineArrayMember({ type: 'sectionCta' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }: { title?: string; slug?: string }) => ({
      title: title || 'Untitled Page',
      subtitle: slug ? `/page/${slug}` : '(no slug)',
    }),
  },
});
