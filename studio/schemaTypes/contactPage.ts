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
    defineField({ name: 'formTitle', type: 'string', title: 'Form Section Title', initialValue: 'Send us a Message', description: 'Heading above the embedded form.' }),
    defineField({
      name: 'formFields',
      type: 'object',
      title: 'Form Labels & Placeholders',
      fields: [
        defineField({ name: 'nameLabel', type: 'string', title: 'Name Label', initialValue: 'Name' }),
        defineField({ name: 'namePlaceholder', type: 'string', title: 'Name Placeholder', initialValue: 'Your name' }),
        defineField({ name: 'emailLabel', type: 'string', title: 'Email Label', initialValue: 'Email' }),
        defineField({ name: 'emailPlaceholder', type: 'string', title: 'Email Placeholder', initialValue: 'your@email.com' }),
        defineField({ name: 'subjectLabel', type: 'string', title: 'Subject Label', initialValue: 'Subject' }),
        defineField({ name: 'subjectPlaceholder', type: 'string', title: 'Subject Placeholder', initialValue: 'How can we help?' }),
        defineField({ name: 'messageLabel', type: 'string', title: 'Message Label', initialValue: 'Message' }),
        defineField({ name: 'messagePlaceholder', type: 'string', title: 'Message Placeholder', initialValue: 'Your message...' }),
        defineField({ name: 'submitLabel', type: 'string', title: 'Submit Button', initialValue: 'Send Message' }),
      ],
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
