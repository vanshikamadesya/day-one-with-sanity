import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { urlFor } from "@/sanity/urlFor";

const VENUES_QUERY = defineQuery(`*[_type == "venue"]{
  _id,
  name,
  slug,
  image
} | order(name asc)`);

export default async function VenuesPage() {
  const { data: venues } = await sanityFetch({ query: VENUES_QUERY });
  console.log("Venue slugs:", venues.map(v => v.slug?.current));

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter">Venues</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {venues.map((venue) => (
          <li key={venue._id} className="bg-white p-4 rounded-lg shadow">
            <Link href={`/venues/${venue.slug?.current}`} className="block hover:underline">
        

              <h2 className="text-xl font-semibold">{venue.name}</h2>
              {venue.image && (
                <img
                  src={urlFor(venue.image).width(400).height(300).url()}
                  alt={venue.name || 'Venue Image'}
                  className="mt-2 rounded"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}