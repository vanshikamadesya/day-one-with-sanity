import { createClient, type QueryParams } from "next-sanity";



export const client = createClient({
  projectId: "ecmjy20p",
  dataset: "production",
  apiVersion: "2024-11-01",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  perspective: "published",
  stega: { studioUrl: '/studio' },

});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  })
}

