import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ecmjy20p",
  dataset: "production",
  apiVersion: "2024-11-01",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  perspective: "published"
});

