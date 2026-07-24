import { describe, it, expect } from 'vitest';
import { generateParametricBlocks } from './ai';

describe('generateParametricBlocks AI Engine', () => {
  it('generates strictly structured blocks injected with tenant parameters', async () => {
    const input = {
      businessName: 'Moda Tesisat',
      city: 'İstanbul',
      district: 'Kadıköy',
      specialty: 'Su Kaçağı Tespiti',
      phone: '0532 111 22 33',
    };

    const { blocks, seo } = await generateParametricBlocks(input);

    expect(blocks.length).toBe(4);
    expect(blocks[0].type).toBe('HeroBlock');
    expect(blocks[0].props.headline).toContain('Kadıköy');
    expect(blocks[0].props.headline).toContain('Moda Tesisat');

    expect(blocks[1].type).toBe('FeaturesBlock');
    expect(blocks[1].props.title).toContain('Moda Tesisat');

    expect(blocks[2].type).toBe('GalleryBlock');
    expect(blocks[3].type).toBe('ContactBlock');
    expect(blocks[3].props.phone).toBe('0532 111 22 33');

    expect(seo.title).toContain('Moda Tesisat');
    expect(seo.title).toContain('Kadıköy');
  });
});
