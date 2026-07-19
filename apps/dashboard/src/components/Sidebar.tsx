import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  onNewProject: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewProject }) => {
  const projects = [
    { id: 1, name: "Tesisatçı Mehmet (Aktif)", status: "running" },
    { id: 2, name: "Çilingir Ahmet", status: "completed" }
  ];

  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-header">
        <h2>Factory OS</h2>
        <span className="badge">v3.0</span>
      </div>
      
      <button className="btn-primary new-project-btn" onClick={onNewProject}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Yeni Proje Ekle
      </button>

      <div className="project-list">
        <h3>PROJELER</h3>
        <ul>
          {projects.map(p => (
            <li key={p.id} className={`project-item ${p.status === 'running' ? 'active' : ''}`}>
              <span className={`status-indicator ${p.status}`}></span>
              {p.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">P</div>
          <div className="info">
            <span className="name">Proje Yöneticisi</span>
            <span className="role">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};
