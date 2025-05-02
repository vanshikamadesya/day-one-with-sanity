import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/queries";
import { sanityFetch, client } from "@/sanity/client";

const params = {
  slug: 'your-slug-value',
}
export const posts = await sanityFetch({
    query: POST_QUERY,
    params,
    tags: [`post:${params.slug}`, 'author', 'category'],
    // revalidate: 3600,
  })

 
// add this export
export async function generateStaticParams() {
  const slugs = await client
    .withConfig({useCdn: false})
    .fetch(POSTS_SLUGS_QUERY);

  return slugs
}