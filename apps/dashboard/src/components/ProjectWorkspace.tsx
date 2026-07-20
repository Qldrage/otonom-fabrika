import React from 'react';
import { ChatView } from './ChatView';
import { FactoryMonitor } from './FactoryMonitor';
import './ProjectWorkspace.css';

export const ProjectWorkspace: React.FC = () => {
  return (
    <div className="workspace-container">
      <div className="workspace-header">
        <h2>Aktif Proje: Tesisatçı Mehmet</h2>
        <div className="header-actions">
          <button className="btn-secondary">Ayarlar</button>
        </div>
      </div>
      
      <div className="workspace-grid">
        <div className="chat-section">
          <ChatView />
        </div>
        <div className="monitor-section">
          <FactoryMonitor />
        </div>
      </div>
    </div>
  );
};
