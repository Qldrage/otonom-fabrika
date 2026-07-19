
import { Sidebar } from './components/Sidebar';
import { ProjectWorkspace } from './components/ProjectWorkspace';
import './index.css';

function App() {
  const handleNewProject = () => {
    console.log("Yeni proje ekranı açılıyor...");
  };

  return (
    <div className="app-container">
      <Sidebar onNewProject={handleNewProject} />
      <div className="main-content">
        <ProjectWorkspace />
      </div>
    </div>
  );
}

export default App;
