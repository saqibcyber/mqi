import { defineType, defineField } from 'sanity';

export const blogPage = defineType({
  name: 'blogPage',
  type: 'document',
  title: 'Blog Page',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', initialValue: 'Blog' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Page Subtitle' }),
  ],
});
