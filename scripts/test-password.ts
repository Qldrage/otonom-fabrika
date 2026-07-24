import 'dotenv/config';
// API key .env dosyasından okunur: GOOGLE_GENERATIVE_AI_API_KEY=...
import { CoalitionOrchestrator } from '../packages/core/src/coordination/CoalitionOrchestrator';

async function main() {
  console.log("🚀 Otonom Fabrika V4 - Şifre Güç Ölçer Testi Başlıyor...");
  
  const orchestrator = new CoalitionOrchestrator();
  
  const leadDeveloperPayload = {
    cwd: "apps/projeadi",
    testFilePath: "src/components/PasswordMeter.test.tsx",
    testCode: `
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PasswordMeter from './PasswordMeter';

describe('PasswordMeter', () => {
  it('renders password input and default strength', () => {
    render(<PasswordMeter />);
    expect(screen.getByPlaceholderText('Şifrenizi girin')).toBeInTheDocument();
    expect(screen.getByText(/Güç:/)).toBeInTheDocument();
  });

  it('shows Zayıf when typing short password', () => {
    render(<PasswordMeter />);
    const input = screen.getByPlaceholderText('Şifrenizi girin');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.getByText('Güç: Zayıf')).toBeInTheDocument();
    const progress = screen.getByTestId('strength-bar');
    expect(progress).toHaveClass('w-1/3');
    expect(progress).toHaveClass('bg-red-500');
  });

  it('shows Orta when password has >5 chars and a number', () => {
    render(<PasswordMeter />);
    const input = screen.getByPlaceholderText('Şifrenizi girin');
    fireEvent.change(input, { target: { value: 'abcdef1' } });
    expect(screen.getByText('Güç: Orta')).toBeInTheDocument();
    const progress = screen.getByTestId('strength-bar');
    expect(progress).toHaveClass('w-2/3');
    expect(progress).toHaveClass('bg-yellow-500');
  });

  it('shows Güçlü when password has >7 chars, a number and a special char', () => {
    render(<PasswordMeter />);
    const input = screen.getByPlaceholderText('Şifrenizi girin');
    fireEvent.change(input, { target: { value: 'abcdef1@' } });
    expect(screen.getByText('Güç: Güçlü')).toBeInTheDocument();
    const progress = screen.getByTestId('strength-bar');
    expect(progress).toHaveClass('w-full');
    expect(progress).toHaveClass('bg-green-500');
  });
});`,
    coderInstruction: "Lütfen src/components/PasswordMeter.tsx dosyasını oluştur. İçinde bir şifre input'u, 'Güç: [Durum]' yazısı ve data-testid='strength-bar' olan bir div (ilerleme çubuğu) olsun. Şifre gücü mantığını TDD testine göre eksiksiz yaz (Kırmızı: w-1/3 bg-red-500, Sarı: w-2/3 bg-yellow-500, Yeşil: w-full bg-green-500).",
    visionEnabled: true
  };

  try {
    const result = await orchestrator.startCoalition(leadDeveloperPayload);
    console.log("✅ GÖREV BAŞARIYLA BAŞLATILDI (Workflow ID):", result);
  } catch (error) {
    console.error("❌ HATA OLUŞTU:", error);
  }
}

main();
