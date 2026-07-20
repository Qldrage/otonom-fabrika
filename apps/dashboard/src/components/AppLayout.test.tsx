import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppLayout } from './AppLayout';

describe('AppLayout Component', () => {
  it('renders a sidebar and a main content area', () => {
    render(
      <AppLayout>
        <div data-testid="main-content">Test Content</div>
      </AppLayout>
    );

    // Sidebar should be present
    const sidebar = screen.getByRole('navigation', { name: /sidebar/i });
    expect(sidebar).toBeInTheDocument();

    // Main content should be present
    const mainContent = screen.getByTestId('main-content');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveTextContent('Test Content');
  });

  it('contains a header within the main content area', () => {
    render(
      <AppLayout>
        <div data-testid="main-content">Test Content</div>
      </AppLayout>
    );

    const header = screen.getByRole('banner', { name: /header/i });
    expect(header).toBeInTheDocument();
  });
});
