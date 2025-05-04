import { defineLive } from "next-sanity";
import { client } from "@/sanity/client";
import { token } from "@/sanity/token";

export const { sanityFetch, SanityLive } = defineLive({
    client: client.withConfig({ apiVersion: "vX" }),
    browserToken: token,
    serverToken: token,
});