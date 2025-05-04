import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
    locations: {
        // Add more locations for other post types
        event: defineLocations({
            select: {
                title: 'title',
                slug: 'slug.current',
            },
            resolve: (doc) => ({
                locations: [
                    {
                        title: doc?.title || 'Untitled',
                        href: `/events/${doc?.slug}`,
                    },
                    { title: 'Events index', href: `/events` },
                ],
            }),
        }),

        page: defineLocations({
            select: {
                title: "title",
                slug: "slug.current",
            },
            resolve: (doc) => ({
                locations: [
                    {
                        title: doc?.title || "Untitled",
                        href: `/${doc?.slug}`,
                    },
                ],
            }),
        }),

    },
}