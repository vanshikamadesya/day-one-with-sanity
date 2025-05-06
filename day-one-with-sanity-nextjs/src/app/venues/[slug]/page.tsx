import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import { Metadata } from "next";
import { urlFor } from "@/sanity/urlFor";

const SINGLE_VENUE_QUERY = `*[_type == "venue" && slug.current == $slug][0]{
  name,
  image,
  address,
  city,
  country
}`;

export async function generateStaticParams() {
    const slugs = await client.fetch(`*[_type == "venue" && defined(slug.current)][].slug.current`);
    return slugs.map((slug: string) => ({ slug }));
  }
  

export default async function VenuePage({ params }: { params: { slug: string } }) {
  console.log("Params received:", params); // Debugging: Log the params object
  console.log("Fetching venue with slug:", params.slug); // Debugging: Log the slug being used
  const { data: venue } = await sanityFetch({ query: SINGLE_VENUE_QUERY, params });

  if (!venue) {
    console.error("Venue not found for slug:", params.slug); // Debugging: Log if venue is not found
    return <p className="p-10">Venue not found</p>;
  }

  return (
    <main className="p-24 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-4xl font-bold">{venue.name}</h1>
      {venue.image && (
        <img
          src={urlFor(venue.image).width(800).height(500).url()}
          alt={venue.name}
          className="rounded"
        />
      )}
      <div className="text-lg">
        <p><strong>Address:</strong> {venue.address}</p>
        <p><strong>City:</strong> {venue.city}</p>
        <p><strong>Country:</strong> {venue.country}</p>
      </div>
    </main>
  );
}
