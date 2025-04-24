import { defineField, defineType } from 'sanity'

export const artistType = defineType({
    name: 'artist',
    title: 'Artist',
    type: 'document',
    groups: [{ name: 'main', title: 'Main' }, { name: 'seo', title: 'SEO' }],
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            group: 'main',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            group: 'seo',
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
            name: 'age',
            type: 'number',
            group: 'main',
        }),
        defineField({
            name: 'description',
            type: 'text', 
            title: 'Artist description'
          }),
          defineField({
            name: 'photo',
            type: 'image',
            title: 'Artist photo',
            options: {
              hotspot: true,
            },
          }),
    ],

    // preview
    preview: {
        select: {
            title: 'name',
            media: 'image',
        },
        prepare(selection) {
            const { title, media } = selection;
            return { title, media };
        },

    }
})