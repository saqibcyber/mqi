import { defineType, defineField } from 'sanity';

export const programsPage = defineType({
  name: 'programsPage',
  type: 'document',
  title: 'Programs Page',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', initialValue: 'Our Programs' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Page Subtitle' }),
  ],
});
