import { EVENT_QUERY, EVENT_SLUGS_QUERY, PAGE_QUERY, HOME_PAGE_QUERY } from "@/sanity/queries";
import { sanityFetch, client } from "@/sanity/client";
import { PageBuilder } from "@/components/PageBuilder";

const params = {
    slug: 'your-slug-value',
}
export const events = await sanityFetch({
    query: EVENT_QUERY,
    params,
    tags: [`event:${params.slug}`, 'venue', 'headline'],
    // revalidate: 3600,
})


// add this export
export async function generateStaticParams() {
    const slugs = await client
        .withConfig({ useCdn: false })
        .fetch(EVENT_SLUGS_QUERY);

    return slugs
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const page = await sanityFetch({
        query: PAGE_QUERY,
        params: await params,
    });

    return page?.content ? <PageBuilder content={page.content} /> : null;
}


// export default async function Page() {
//   const page = await sanityFetch({
//     query: HOME_PAGE_QUERY,
//   });

//   return page?.homePage?.content ? (
//     <PageBuilder content={page?.homePage.content} />
//   ) : null;
// }
