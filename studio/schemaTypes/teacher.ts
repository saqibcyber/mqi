import { defineType, defineField } from 'sanity';

export const teacher = defineType({
  name: 'teacher',
  type: 'document',
  title: 'Teacher',
  description: 'Add, edit, reorder teachers. Use the order field to control display order (lower numbers appear first).',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string', title: 'Role', validation: (r) => r.required() }),
    defineField({
      name: 'shortDescription',
      type: 'string',
      title: 'Short Description',
      description: 'One-line description displayed on teacher cards.',
      validation: (r) => r.max(200).warning('Keep under 200 characters for best display.'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Profile Image',
      description: 'Optional. Shown on teacher cards.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers appear first. Use to reorder teachers.',
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Name', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'image' },
    prepare: ({ title, subtitle, media }: { title?: string; subtitle?: string; media?: unknown }) => ({
      title: title || 'Untitled Teacher',
      subtitle: subtitle || '',
      media,
    }),
  },
});

export const teachersPage = defineType({
  name: 'teachersPage',
  type: 'document',
  title: 'Our Teachers Page',
  description: 'Page content for /teachers. Teachers are managed separately as Teacher documents.',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', initialValue: 'Our Teachers' }),
    defineField({ name: 'intro', type: 'text', title: 'Intro Text', rows: 3 }),
    defineField({
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Title',
      description: 'Override for browser tab and search results.',
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      title: 'SEO Description',
      description: 'Meta description for search engines.',
      rows: 2,
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Social Share Image',
      description: 'Optional. Used when page is shared on social media.',
      options: { hotspot: true },
    }),
  ],
});
