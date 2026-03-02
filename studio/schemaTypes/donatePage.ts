import { defineType, defineField } from 'sanity';

export const donateTrustBullet = defineType({
  name: 'donateTrustBullet',
  type: 'object',
  title: 'Trust Bullet',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'desc', type: 'string', title: 'Description', validation: (r) => r.required() }),
  ],
});

export const donatePage = defineType({
  name: 'donatePage',
  type: 'document',
  title: 'Donate Page',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', initialValue: 'Support Our Mission' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Page Subtitle' }),
    defineField({
      name: 'trustBullets',
      type: 'array',
      title: 'Trust Section',
      of: [{ type: 'donateTrustBullet' }],
    }),
    defineField({
      name: 'jotformDonateUrl',
      type: 'string',
      title: 'General Donations Jotform URL',
      description: 'Full URL (e.g. https://form.jotform.com/123456789) or form ID only. Embedded on the donate page.',
    }),
    defineField({
      name: 'donateFormTitle',
      type: 'string',
      title: 'General Donations Section Title',
      initialValue: 'Make a Donation',
    }),
    defineField({
      name: 'jotformSponsorStudentUrl',
      type: 'string',
      title: 'Sponsor a Student Jotform URL',
      description: 'Full URL or form ID for the Sponsor a Student form. Embedded below general donations.',
    }),
    defineField({
      name: 'sponsorFormTitle',
      type: 'string',
      title: 'Sponsor a Student Section Title',
      initialValue: 'Sponsor a Student',
    }),
    defineField({
      name: 'additionalContent',
      type: 'array',
      title: 'Additional Content',
      of: [{ type: 'block' }],
      description: 'Optional rich text (e.g. impact story, thank-you message) below the forms.',
    }),
  ],
});
