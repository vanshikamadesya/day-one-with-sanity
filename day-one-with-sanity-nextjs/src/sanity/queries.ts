// Define the query to fetch a single post by its slug
export const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    body,
    publishedAt,
    author->{
      name,
      image
    }
  }
`;

// Define the query to fetch all post slugs
export const POSTS_SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current)]{
    'slug': slug.current
  }
`;