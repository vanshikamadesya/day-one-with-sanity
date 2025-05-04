import Image from "next/image";
import { urlFor } from "@/sanity/urlFor";
import { PortableText } from "@portabletext/react";

interface SplitImageProps {
    _key: string;
    _type: "splitImage";
    image?: {
        _type: 'image';
        asset: {
            _ref: string;
            _type: 'reference';
        };
    };
    content?: any[];
    orientation?: 'left' | 'right';
}

export function SplitImage(props: SplitImageProps) {
    const { image, content, orientation = 'left' } = props;

    return (
        <section className="container mx-auto grid md:grid-cols-2 gap-8 py-16">
            {orientation === 'left' ? (
                <>
                    {image && (
                        <div className="relative aspect-square">
                            <Image
                                src={urlFor(image).width(800).height(800).url()}
                                alt=""
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    )}
                    {content && (
                        <div className="flex items-center">
                            <div className="prose max-w-none">
                                <PortableText value={content} />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {content && (
                        <div className="flex items-center">
                            <div className="prose max-w-none">
                                <PortableText value={content} />
                            </div>
                        </div>
                    )}
                    {image && (
                        <div className="relative aspect-square">
                            <Image
                                src={urlFor(image).width(800).height(800).url()}
                                alt=""
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

// import Image from "next/image";
// import { urlFor } from "@/sanity/urlFor";
// import { PAGE_QUERYResult } from "@/sanity/types";
// import { stegaClean } from "next-sanity";

// type SplitImageProps = Extract<
//     NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
//     { _type: "splitImage" }
// >;

// export function SplitImage({ title, image, orientation }: SplitImageProps) {
//     return (
//         <section
//             className="container mx-auto flex gap-8 py-16 data-[orientation='imageRight']:flex-row-reverse"
//             data-orientation={stegaClean(orientation) || "imageLeft"}
//         >
//             {image ? (
//                 <Image
//                     className="rounded-xl w-2/3 h-auto"
//                     src={urlFor(image).width(800).height(600).url()}
//                     width={800}
//                     height={600}
//                     alt=""
//                 />
//             ) : null}
//             <div className="w-1/3 flex items-center">
//                 {title ? (
//                     <h2 className="text-3xl mx-auto md:text-5xl lg:text-8xl font-light text-pink-500 text-pretty max-w-3xl">
//                         {title}
//                     </h2>
//                 ) : null}
//             </div>
//         </section>
//     );
// }