import { useState } from 'react';
import './ChatView.css';

export const ChatView: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'system', text: 'Tesisatçı Mehmet projesi başlatıldı. Fabrika Müdürü (Lead Dev) hatta. Nasıl bir site istiyorsunuz?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: input }]);
    setInput('');
    
    try {
      // Chat geçmişini OpenAI formatına çevir
      const aiMessages = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      })).concat(userMsg);

      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: aiMessages })
      });

      if (!res.ok) throw new Error('API Error');
      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      
      const aiMsgId = Date.now() + 1;
      setMessages(prev => [...prev, { id: aiMsgId, sender: 'system', text: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
        
        for (const line of lines) {
          const dataStr = line.replace('data: ', '');
          if (dataStr === '[DONE]') break;
          try {
            const data = JSON.parse(dataStr);
            if (data.error) {
              setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: m.text + '\n❌ ' + data.error } : m));
            } else if (data.text) {
              setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: m.text + data.text } : m));
            }
          } catch (e) {}
        }
      }
    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'system', text: '❌ Sunucuya bağlanılamadı. DashboardServer ve vLLM çalışıyor mu?' }]);
    }
  };

  return (
    <div className="chat-container glass-panel">
      <div className="chat-header">
        <div className="agent-info">
          <div className="agent-avatar">🤖</div>
          <div>
            <h3>Lead Architect (Gemini)</h3>
            <span className="agent-status">Online</span>
          </div>
        </div>
      </div>
      
      <div className="messages-area">
        {messages.map(m => (
          <div key={m.id} className={`message-bubble ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="Ajanlara talimat verin..."
        />
        <button className="send-btn" onClick={handleSend}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};
