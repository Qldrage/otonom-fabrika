import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { FeaturesBlock } from './FeaturesBlock';
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

describe('FeaturesBlock', () => {
  it('renders features title and feature items', () => {
    const features = [
      { title: 'Ücretsiz Ölçü', description: 'Evinizde yerinde ölçü alıyoruz.' },
      { title: 'Uzman Montaj', description: 'Titiz ve temiz işçilik.' },
    ];

    render(<FeaturesBlock title="Neden Bizi Seçmelisiniz?" features={features} />);

    expect(screen.getByText('Neden Bizi Seçmelisiniz?')).toBeInTheDocument();
    expect(screen.getByText('Ücretsiz Ölçü')).toBeInTheDocument();
    expect(screen.getByText('Evinizde yerinde ölçü alıyoruz.')).toBeInTheDocument();
  });
});
