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
      title: 'Apply Form Section Title',
      initialValue: 'Apply for this Position',
      description: 'Heading above the Jotform when viewing a role.',
    }),
    defineField({
      name: 'introContent',
      type: 'array',
      title: 'Intro / Additional Content',
      of: [{ type: 'block' }],
      description: 'Optional rich text below the subtitle.',
    }),
  ],
});
