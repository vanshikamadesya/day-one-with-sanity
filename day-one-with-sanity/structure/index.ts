import type { StructureResolver } from 'sanity/structure'
import { CalendarIcon, UsersIcon, PinIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
    S.list()
        .id('root')
        .title('Content')
        .items([
            // 📦 Group all events under one parent
            S.listItem()
                .title('Events')
                .icon(CalendarIcon)
                .child(
                    S.list()
                        .title('Events')
                        .items([
                            // ➕ All Events (shows + icon to add new)
                            S.documentTypeListItem('event').title('All Events'),

                            // 📅 Upcoming
                            S.listItem()
                                .title('Upcoming Events')
                                .icon(CalendarIcon)
                                .child(
                                    S.documentList()
                                        .title('Upcoming Events')
                                        .filter('date >= now()')
                                        .schemaType('event')
                                ),

                            // 📅 Past
                            S.listItem()
                                .title('Past Events')
                                .icon(CalendarIcon)
                                .child(
                                    S.documentList()
                                        .title('Past Events')
                                        .filter('date < now()')
                                        .schemaType('event')
                                ),
                        ])
                ),
            S.divider(),
            S.documentTypeListItem('artist').title('Artists').icon(UsersIcon),
            S.documentTypeListItem('venue').title('Venues').icon(PinIcon),
            S.divider(),
            S.documentTypeListItem("page").title("Pages").icon(PinIcon),
            S.documentTypeListItem("faq").title("FAQs").icon(PinIcon),
            S.divider(),
            // ...S.documentTypeListItems().filter(
            //     (item) =>
            //         item.getId() &&
            //         !["event", "artist", "venue", "page", "faq"].includes(item.getId()!)
            // ),

            S.listItem()
                .id("siteSettings")
                .schemaType("siteSettings")
                .title("Site Settings")
                .child(
                    S.editor()
                        .id("siteSettings")
                        .schemaType("siteSettings")
                        .documentId("siteSettings")
                ),
            ...S.documentTypeListItems().filter(
                (item) =>
                    item.getId() &&
                    ![
                        "event",
                        "artist",
                        "venue",
                        "page",
                        "faq",
                        "siteSettings"
                    ].includes(item.getId()!)
            ),


        ])