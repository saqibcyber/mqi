import { defineType, defineField } from 'sanity';

export const blogPage = defineType({
  name: 'blogPage',
  type: 'document',
  title: 'Blog Page',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', initialValue: 'Blog' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Page Subtitle', rows: 3 }),
    defineField({
      name: 'introContent',
      type: 'array',
      title: 'Intro / Additional Content',
      of: [{ type: 'block' }],
      description: 'Optional rich text below the subtitle.',
    }),
  ],
});
