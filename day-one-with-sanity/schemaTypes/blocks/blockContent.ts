import { defineType, defineArrayMember } from "sanity";

export const blockContent = defineType({
    name: "blockContent",
    title: "Block Content",
    type: "array",
    of: [
        defineArrayMember({
            type: "block",
            styles: [
                { title: "Normal", value: "normal" },
                { title: "H1", value: "h1" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "Quote", value: "blockquote" }
            ],
            lists: [{ title: "Bullet", value: "bullet" }],
            marks: {
                decorators: [
                    { title: "Strong", value: "strong" },
                    { title: "Emphasis", value: "em" }
                ],
                annotations: [
                    {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                            {
                                name: "href",
                                type: "url",
                                title: "URL"
                            }
                        ]
                    }
                ]
            }
        }),
        defineArrayMember({
            type: "image",
            options: { hotspot: true }
        })
    ]
});