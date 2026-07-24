import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { GalleryBlock } from './GalleryBlock';
import React from 'react';

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
    unobserve() {}
  };
});

describe('GalleryBlock', () => {
  it('renders title and gallery items', () => {
    const items = [
      { title: 'Zebra Perde', category: 'Stor', imageUrl: 'https://example.com/zebra.jpg' },
      { title: 'Fon Perde', category: 'Kumaş', imageUrl: 'https://example.com/fon.jpg' },
    ];

    render(<GalleryBlock title="Ürünlerimiz" subtitle="Popüler modeller" items={items} />);

    expect(screen.getByText('Ürünlerimiz')).toBeInTheDocument();
    expect(screen.getByText('Popüler modeller')).toBeInTheDocument();
    expect(screen.getByText('Zebra Perde')).toBeInTheDocument();
    expect(screen.getByText('Fon Perde')).toBeInTheDocument();
  });
});
