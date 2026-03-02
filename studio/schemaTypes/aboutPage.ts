import { defineType, defineField } from 'sanity';

export const aboutTeacher = defineType({
  name: 'aboutTeacher',
  type: 'object',
  title: 'Teacher',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
      description: 'e.g. Head Instructor, Tajweed Teacher',
    }),
    defineField({
      name: 'oneLineDescription',
      type: 'string',
      title: 'One-line description',
      description: 'Short description shown under the teacher name.',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
    }),
  ],
});

export const aboutGraduate = defineType({
  name: 'aboutGraduate',
  type: 'object',
  title: 'Graduate',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'e.g. Hafiz, Alumni, Community Leader',
    }),
    defineField({
      name: 'yearOfGraduation',
      type: 'string',
      title: 'Year of Graduation',
      description: 'e.g. 2024',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
    }),
  ],
});

export const aboutPage = defineType({
  name: 'aboutPage',
  type: 'document',
  title: 'About Page',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'About Us',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Page Subtitle',
      rows: 3,
      description: 'Short introductory text shown under the About Us heading.',
    }),
    defineField({
      name: 'instituteText',
      type: 'text',
      title: 'Institute Text',
      rows: 6,
      description: 'Main About Us copy describing the institute. This will also be shortened for the homepage.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero / Supporting Image',
      options: { hotspot: true },
      description: 'Shown on the About page and homepage About section.',
    }),
    defineField({
      name: 'teachers',
      type: 'array',
      title: 'Teachers',
      of: [{ type: 'aboutTeacher' }],
    }),
    defineField({
      name: 'graduates',
      type: 'array',
      title: 'Graduates',
      of: [{ type: 'aboutGraduate' }],
    }),
  ],
});

