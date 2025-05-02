const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: "https", hostname: "cdn.sanity.io" },
        { protocol: "https", hostname: "placehold.co" },
      ],
    },
  
    logging: {
      fetches: {
        fullUrl: true,
      },
    },  
  };
  
  export default nextConfig;