import { defineType, defineField } from 'sanity';

export const contactInfoItem = defineType({
  name: 'contactInfoItem',
  type: 'object',
  title: 'Contact Info Item',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: { list: ['address', 'phone', 'email', 'hours'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', type: 'string', title: 'Title (e.g. Address)' }),
    defineField({ name: 'content', type: 'text', title: 'Content', validation: (r) => r.required() }),
  ],
});

export const contactPage = defineType({
  name: 'contactPage',
  type: 'document',
  title: 'Contact Page',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', initialValue: 'Contact Us' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Page Subtitle' }),
    defineField({
      name: 'jotformUrl',
      type: 'string',
      title: 'Jotform URL',
      description: 'Full URL (e.g. https://form.jotform.com/123456789) or form ID only. Embedded on the contact page.',
    }),
    defineField({ name: 'formTitle', type: 'string', title: 'Form Section Title', initialValue: 'Send us a Message', description: 'Heading above the embedded Jotform.' }),
    defineField({
      name: 'introText',
      type: 'text',
      title: 'Intro / Additional Content',
      rows: 4,
      description: 'Optional text shown below the subtitle (e.g. office hours note).',
    }),
    defineField({
      name: 'contactInfo',
      type: 'array',
      title: 'Contact Info',
      of: [{ type: 'contactInfoItem' }],
    }),
    defineField({
      name: 'mapEmbedUrl',
      type: 'url',
      title: 'Google Map Embed URL',
      description: 'Use the embed URL from Google Maps share option.',
    }),
  ],
});
