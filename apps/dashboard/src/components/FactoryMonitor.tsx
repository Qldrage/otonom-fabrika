import { useState } from 'react';
import './FactoryMonitor.css';

export const FactoryMonitor: React.FC = () => {
  const [pipelineState] = useState(2); // 0: Plan, 1: Code, 2: Test, 3: Deploy

  const steps = [
    { id: 0, title: "Sektörel Analiz (Intent)", icon: "🧠" },
    { id: 1, title: "Veritabanı & Kodlama", icon: "💻" },
    { id: 2, title: "Görsel Testler (VLM)", icon: "🧪" },
    { id: 3, title: "Canlıya Alım (Deploy)", icon: "🚀" }
  ];

  return (
    <div className="monitor-container glass-panel">
      <h3>Üretim Bandı (Pipeline)</h3>
      
      <div className="pipeline-steps">
        {steps.map((step, index) => (
          <div key={step.id} className={`step ${index < pipelineState ? 'completed' : index === pipelineState ? 'active' : 'pending'}`}>
            <div className="step-icon">{step.icon}</div>
            <div className="step-info">
              <h4>{step.title}</h4>
              <span className="step-status">
                {index < pipelineState ? 'Tamamlandı' : index === pipelineState ? 'Devam Ediyor...' : 'Bekliyor'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {pipelineState === 3 && (
        <div className="approval-box animate-fade-in">
          <div className="alert-icon">⚠️</div>
          <div className="approval-content">
            <h4>İnsan Onayı (Human-in-the-loop) Bekleniyor</h4>
            <p>Ajanlar projeyi tamamladı. İnternete yüklemek için onayınız gerekiyor.</p>
            <div className="cost-estimate">Tahmini Maliyet: $1.20</div>
          </div>
          <button className="btn-success">CANLIYA AL</button>
        </div>
      )}
      
      {/* FinOps Demo Widget */}
      <div className="finops-mini">
        <h4>FinOps Özeti</h4>
        <div className="stat"><span>Kullanılan Token:</span> <span>42,500</span></div>
        <div className="stat"><span>API Maliyeti:</span> <span>$0.65</span></div>
      </div>
    </div>
  );
};
