import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroBlock } from './HeroBlock';
import React from 'react';

describe('HeroBlock', () => {
  it('renders the headline and subheadline correctly', () => {
    render(
      <HeroBlock 
        headline="Modern Perde Sistemleri" 
        subheadline="Evinize en uygun perdeler" 
      />
    );
    
    expect(screen.getByText('Modern Perde Sistemleri')).toBeInTheDocument();
    expect(screen.getByText('Evinize en uygun perdeler')).toBeInTheDocument();
  });

  it('renders a CTA button if ctaText is provided', () => {
    render(
      <HeroBlock 
        headline="Modern Perde Sistemleri" 
        subheadline="Evinize en uygun perdeler" 
        ctaText="Hemen İletişime Geç"
      />
    );
    
    const cta = screen.getByText('Hemen İletişime Geç');
    expect(cta).toBeInTheDocument();
    expect(cta.closest('a')).toHaveAttribute('href', '#contact');
  });

  it('renders an image if imageUrl is provided', () => {
    render(
      <HeroBlock 
        headline="Modern Perde Sistemleri" 
        subheadline="Evinize en uygun perdeler" 
        imageUrl="https://example.com/curtain.jpg"
      />
    );
    
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/curtain.jpg');
  });
});
