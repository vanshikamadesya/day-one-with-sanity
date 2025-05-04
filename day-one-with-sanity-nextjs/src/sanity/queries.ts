import { defineQuery } from "next-sanity";

// Define the query to fetch a single post by its slug
export const EVENT_QUERY = `
  *[_type == "event" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    format,
    date,
    doorsOpen,
    venue->{
      name,
      address
    },
    headline->{
      name,
      image
    },
    image,
    details,
    tickets,
    relatedEvents[]->{
      _id,
      _key,
      name,
      slug
    }
  }
`;

// Define the query to fetch all event slugs
export const EVENT_SLUGS_QUERY = `
  *[_type == "event" && defined(slug.current)]{
    'slug': slug.current,
    name,
    date
  }
`;


export const PAGE_QUERY =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ...,
  content[]{
    ...,
    _type == "faqs" => {
      ...,
      faqs[]->
    }
  }
}`);



export const HOME_PAGE_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  homePage->{
    ...,
    content[]{
      ...,
      _type == "faqs" => {
        ...,
        faqs[]->
      }
    }      
  }
}`);