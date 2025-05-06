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
    seo->{
      title,
      description,
      keywords 
    }
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


// Define the query to fetch a single venue by its slug
export const VENUE_QUERY = `
  *[_type == "venue" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    image,
    address,
    city,
    country,
    description,
    events[]->{
      _id,
      name,
      date
    }
  }
`;

// Define the query to fetch all venue slugs
export const VENUE_SLUGS_QUERY = `
  *[_type == "venue" && defined(slug.current)]{
    'slug': slug.current,
    name
  }
`;



export const PAGE_QUERY =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ...,
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description,  ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  },
  content[]{
    ...,
    _type == "faqs" => {
      ...,
faqs[]->{
  _id,
  title,
  body,
  "text": pt::text(body)
}    }
  }
}`);



export const HOME_PAGE_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  homePage->{
    ...,
    content[]{
      ...,
      _type == "faqs" => {
        ...,
faqs[]->{
  _id,
  title,
  body,
  "text": pt::text(body)
}      }
    }      
  }
}`);


export const REDIRECTS_QUERY = defineQuery(`
  *[_type == "redirect" && isEnabled == true] {
      source,
      destination,
      permanent
  }
`);

export const OG_IMAGE_QUERY = defineQuery(`
  *[_id == $id][0]{
    title,
    "image": mainImage.asset->{
      url,
      metadata {
        palette
      }
    }
  }    
`);

export const SITEMAP_QUERY = defineQuery(`
  *[_type in ["page", "event"] && defined(slug.current)] {
      "href": select(
        _type == "page" => "/" + slug.current,
        _type == "event" => "/events/" + slug.current,
        slug.current
      ),
      _updatedAt
  }
  `)