import { defineField, defineType } from 'sanity'

export const venueType = defineType({
    name: 'venue',
    title: 'Venue',
    type: 'document',
    groups: [{ name: 'main', title: 'Main' }, { name: 'details', title: 'Details' }],
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            group: 'main',
        }),
        defineField({
            name: 'image',
            type: 'image',
            options: {
                hotspot: true,
            },
            group: 'main',
        }),
        defineField({
            name: 'address',
            type: 'string',
            group: 'details',
        }),
        defineField({
            name: 'city',
            type: 'string',
          }),
          defineField({
            name: 'country',
            type: 'string',
          }),
    ],

    // preview section
    preview: {
        select: {
            title: 'name',
            media: 'image',
        },
        prepare(selection) {
            const { title, media } = selection
            return { title, media }
        },
    }
})