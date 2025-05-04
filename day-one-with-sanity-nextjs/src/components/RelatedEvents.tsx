"use client";

import Link from "next/link";
import { createDataAttribute } from "next-sanity";
import { EVENT_QUERYResult } from "@/sanity/types";
import { client } from "@/sanity/client";
import { useOptimistic } from "next-sanity/hooks";

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
    projectId,
    dataset,
    baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

type RelatedEvent = {
    _key: string;
    _id: string;
    name: string;
    slug: { current: string };
};

export function RelatedEvents({
    relatedEvents,
    documentId,
    documentType,
}: {
    relatedEvents: Array<RelatedEvent> | null;  // Updated type definition
    documentId: string;
    documentType: string;
}) {
    const events = useOptimistic<
        Array<RelatedEvent>,
        NonNullable<EVENT_QUERYResult>
    >(relatedEvents || [], (state, action) => {  // Added null check with default empty array
        if (action.id === documentId && action?.document?.relatedEvents) {
            return action.document.relatedEvents.map(
                (event: RelatedEvent) => state.find((e) => e._key === event._key) ?? event
            );
        }
        return state;
    });

    if (!events?.length) {  // Updated check
        return null;
    }

    return (
        <aside className="border-t">
            <h2>Related Events</h2>
            <div className="not-prose text-balance">
                <ul
                    className="flex flex-col sm:flex-row gap-0.5"
                    data-sanity={createDataAttribute({
                        ...createDataAttributeConfig,
                        id: documentId,
                        type: documentType,
                        path: "relatedEvents",
                    }).toString()}
                >
                    {events.map((event) => (
                        <li
                            key={event._key}
                            className="p-4 bg-blue-50 sm:w-1/3 flex-shrink-0"
                            data-sanity={createDataAttribute({
                                ...createDataAttributeConfig,
                                id: documentId,
                                type: documentType,
                                path: `relatedEvents[_key=="${event._key}"]`,
                            }).toString()}
                        >
                            <Link href={`/events/${event?.slug?.current}`}>{event.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}