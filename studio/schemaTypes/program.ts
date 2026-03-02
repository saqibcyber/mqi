import { defineType, defineField } from 'sanity';

const categoryIconOptions = [
  'BookOpen',
  'GraduationCap',
  'Sun',
  'BookMarked',
  'Library',
  'School',
  'Calendar',
  'Clock',
  'Users',
  'Sparkles',
  'Palette',
  'Globe',
  'Heart',
  'Award',
  'Target',
];

export const program = defineType({
  name: 'program',
  type: 'document',
  title: 'Program',
  fields: [
    defineField({ name: 'slug', type: 'slug', title: 'Slug', validation: (r) => r.required(), options: { source: 'title' } }),
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{ type: 'programCategory' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      description: 'Used on program cards and detail page.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description (for cards)',
      description: 'Brief summary shown on the Programs listing page.',
      rows: 2,
    }),
    defineField({ name: 'overview', type: 'text', title: 'Overview', validation: (r) => r.required() }),
    defineField({ name: 'audience', type: 'string', title: 'Audience' }),
    defineField({
      name: 'schedule',
      type: 'string',
      title: 'Schedule (one-line for card badge)',
      description: 'Short line for the program card, e.g. "Weekends" or "Mon–Fri".',
    }),
    defineField({
      name: 'scheduleContent',
      type: 'array',
      title: 'Schedule (detail page)',
      description: 'Structured schedule content for the program detail page.',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'curriculum',
      type: 'array',
      title: 'Curriculum',
      of: [{ type: 'string' }],
      options: { layout: 'list' },
    }),
    defineField({ name: 'fees', type: 'string', title: 'Fees' }),
    defineField({
      name: 'jotformUrl',
      type: 'string',
      title: 'Jotform URL',
      description: 'Full URL (e.g. https://form.jotform.com/123456789) or Jotform form ID only. Opens in a modal on the program page.',
    }),
    defineField({
      name: 'jotformId',
      type: 'string',
      title: 'Jotform ID (legacy)',
      description: 'Deprecated: use Jotform URL above. Form ID only, e.g. 123456789.',
      hidden: ({ document }) => !!document?.jotformUrl,
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'q', type: 'string', title: 'Question' }),
            defineField({ name: 'a', type: 'text', title: 'Answer' }),
          ],
          preview: { select: { title: 'q' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'FAQ' }) },
        },
      ],
    }),
  ],
});

export const programCategory = defineType({
  name: 'programCategory',
  type: 'document',
  title: 'Program Category',
  fields: [
    defineField({ name: 'slug', type: 'slug', title: 'Slug', validation: (r) => r.required(), options: { source: 'title' } }),
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      options: { list: categoryIconOptions },
      initialValue: 'BookOpen',
    }),
    defineField({
      name: 'programs',
      type: 'array',
      title: 'Programs',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'slug', type: 'string', title: 'Program slug (match program document)', validation: (r) => r.required() }),
            defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
            defineField({ name: 'ages', type: 'string', title: 'Ages' }),
            defineField({ name: 'schedule', type: 'string', title: 'Schedule' }),
          ],
          preview: { select: { title: 'title' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Program' }) },
        },
      ],
    }),
  ],
});
