import 'dotenv/config';
// API key .env dosyasından okunur: GOOGLE_GENERATIVE_AI_API_KEY=...
import { CoalitionOrchestrator } from '../packages/core/src/coordination/CoalitionOrchestrator';

async function main() {
  console.log("🚀 Otonom Fabrika V4 Hibrit Mimari Testi Başlıyor...");
  console.log("Hedef Görev: Basit bir React Buton Bileşeni Tasarla (Primary, Secondary özellikleri olsun)");
  
  const orchestrator = new CoalitionOrchestrator();
  
  const leadDeveloperPayload = {
    cwd: "apps/projeadi",
    testFilePath: "src/components/LoginForm.test.tsx",
    testCode: `
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('renders inputs and submit button', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error if submitted empty', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Email and password are required')).toBeInTheDocument();
  });

  it('calls onSubmit with credentials when valid', () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(handleSubmit).toHaveBeenCalledWith('test@test.com', 'password123');
    expect(screen.queryByText('Email and password are required')).not.toBeInTheDocument();
  });
});`,
    coderInstruction: "Lütfen src/components/LoginForm.tsx dosyasını oluştur. İçinde email ve password inputları ile bir submit butonu olsun. Validation mantığını (boş submit edilince hata mesajı çıkması) kesinlikle testte beklendiği gibi uygula. Tailwind kullan.",
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
