import { Hero } from "@/components/blocks/Hero";
import { Features } from "@/components/blocks/Features";
import { SplitImage } from "@/components/blocks/SplitImage";
import { FAQs } from "@/components/blocks/FAQs";
import { PAGE_QUERYResult } from "@/sanity/types";

type BlockBase = {
    _key: string;
    _type: string;
};

type HeroBlock = BlockBase & {
    _type: 'hero';
    title?: string;
    text?: any;
    image?: any;
};

type FeaturesBlock = BlockBase & {
    _type: 'features';
    title?: string;
    features?: any[];
};

type SplitImageBlock = BlockBase & {
    _type: 'splitImage';
    image?: any;
    content?: any;
};

type FAQsBlock = BlockBase & {
    _type: 'faqs';
    title?: string;
    faqs?: any[];
};

type Block = HeroBlock | FeaturesBlock | SplitImageBlock | FAQsBlock;

type PageBuilderProps = {
    content: Block[];
};

export function PageBuilder({ content }: PageBuilderProps) {
    if (!Array.isArray(content)) {
        return null;
    }

    return (
        <main>
            {content.map((block) => {
                switch (block._type) {
                    case "hero":
                        return <Hero key={block._key} {...block} />;
                    case "features":
                        return <Features key={block._key} {...block} />;
                    case "splitImage":
                        return <SplitImage key={block._key} {...block} />;
                    case "faqs":
                        return <FAQs key={block._key} {...block} />;
                    default:
                        return <div key={block._key}>Block not found: {block._type}</div>;
                }
            })}
        </main>
    );
}