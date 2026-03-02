import { defineType, defineField } from 'sanity';

const roleIconOptions = ['Briefcase', 'Users', 'Heart'];

export const careerRole = defineType({
  name: 'careerRole',
  type: 'document',
  title: 'Career / Volunteer Role',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: { list: ['Teaching', 'Admin', 'Volunteer'] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      options: { list: roleIconOptions },
      initialValue: 'Briefcase',
    }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'description', type: 'text', title: 'Description', validation: (r) => r.required() }),
    defineField({
      name: 'requirements',
      type: 'array',
      title: 'Requirements',
      of: [{ type: 'string' }],
      options: { layout: 'list' },
    }),
    defineField({
      name: 'jotformLink',
      type: 'string',
      title: 'Jotform Link',
      description: 'Full URL (e.g. https://form.jotform.com/123456789) or form ID only.',
    }),
  ],
});

export const careersPage = defineType({
  name: 'careersPage',
  type: 'document',
  title: 'Careers Page',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', initialValue: 'Career & Volunteer Opportunities' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Page Subtitle' }),
    defineField({
      name: 'applyFormTitle',
      type: 'string',
      title: 'Apply Form Title',
      initialValue: 'Apply for this Position',
    }),
    defineField({
      name: 'formFields',
      type: 'object',
      title: 'Form Labels & Placeholders',
      fields: [
        defineField({ name: 'nameLabel', type: 'string', title: 'Full Name Label', initialValue: 'Full Name' }),
        defineField({ name: 'namePlaceholder', type: 'string', title: 'Full Name Placeholder', initialValue: 'Your full name' }),
        defineField({ name: 'emailLabel', type: 'string', title: 'Email Label', initialValue: 'Email' }),
        defineField({ name: 'emailPlaceholder', type: 'string', title: 'Email Placeholder', initialValue: 'your@email.com' }),
        defineField({ name: 'phoneLabel', type: 'string', title: 'Phone Label', initialValue: 'Phone Number' }),
        defineField({ name: 'phonePlaceholder', type: 'string', title: 'Phone Placeholder', initialValue: '(555) 000-0000' }),
        defineField({ name: 'messageLabel', type: 'string', title: 'Message Label', initialValue: 'Why are you interested in this role?' }),
        defineField({ name: 'messagePlaceholder', type: 'string', title: 'Message Placeholder', initialValue: 'Tell us about yourself and your experience...' }),
        defineField({ name: 'submitLabel', type: 'string', title: 'Submit Button', initialValue: 'Submit Application' }),
      ],
    }),
  ],
});
