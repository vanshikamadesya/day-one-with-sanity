import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'
import { DoorsOpenInput } from './components/DoorsOpenInput'



export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [{ name: 'details', title: 'Details' }, { name: 'editorials', title: 'Editorials' }],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule
        .required()
        .error('Required to generate a page on the website'),
      hidden: ({ document }) => !document?.name,
      group: 'details',
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      title: 'Event type',
      deprecated: {
        reason: 'Use the "Event format" field instead.'
      },
      hidden: true,
      readOnly: true,
      options: {
        list: ['in-person', 'virtual'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'format',
      type: 'string',
      title: 'Event format',
      options: {
        list: ['in-person', 'virtual'],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      group: 'details',
    }),
    defineField({
      name: 'doorsOpen',
      description: 'Number of minutes before the start time for admission',
      type: 'number',
      initialValue: 60,
      group: 'details',
      components: {
        input: DoorsOpenInput
      }
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{ type: 'venue' }],  // reference to venueType
      readOnly: ({ value, document }) => !value && document?.eventType === 'virtual',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && context?.document?.eventType === 'virtual') {
            return 'Virtual events must not have a venue'
          }
          return true
        })
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{ type: 'artist' }],  // reference to artistType
      group: 'details',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'editorials',
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'editorials',
    }),
    defineField({
      name: 'tickets',
      type: 'url',
      group: 'details',
    }),
  ],
  // Update the preview key in the schema
  preview: {
    select: {
      name: 'name',
      venue: 'venue.name',
      artist: 'headline.name',
      date: 'date',
      image: 'image',
    },
    prepare({ name, venue, artist, date, image }) {
      const nameFormatted = name || 'Untitled event'
      const dateFormatted = date
        ? new Date(date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
        : 'No date'

      return {
        title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
        subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    },
  },

})