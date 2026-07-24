import React from 'react';
import { HeroBlock, HeroBlockProps } from './blocks/HeroBlock';
import { ContactBlock, ContactBlockProps } from './blocks/ContactBlock';
import { GalleryBlock, GalleryBlockProps } from './blocks/GalleryBlock';
import { FeaturesBlock, FeaturesBlockProps } from './blocks/FeaturesBlock';

export type Block =
  | { type: 'HeroBlock'; props: HeroBlockProps }
  | { type: 'ContactBlock'; props: ContactBlockProps }
  | { type: 'GalleryBlock'; props: GalleryBlockProps }
  | { type: 'FeaturesBlock'; props: FeaturesBlockProps };

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  if (!blocks || blocks.length === 0) {
    return <div className="p-8 text-center text-gray-500">Sayfa içeriği bulunamadı.</div>;
  }

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'HeroBlock':
            return <HeroBlock key={index} {...block.props} />;
          case 'ContactBlock':
            return <ContactBlock key={index} {...block.props} />;
          case 'GalleryBlock':
            return <GalleryBlock key={index} {...block.props} />;
          case 'FeaturesBlock':
            return <FeaturesBlock key={index} {...block.props} />;
          default:
            return <div key={index} className="p-4 bg-red-100 text-red-700">Bilinmeyen blok tipi: {(block as any).type}</div>;
        }
      })}
    </>
  );
}
