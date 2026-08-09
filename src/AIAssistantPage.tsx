import { useState } from 'react';
import { Sparkles, Send, Copy, RefreshCw, Lightbulb, PenTool, Mail, Zap, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const suggestedPrompts = [
  { icon: PenTool, label: 'Generate subject line', prompt: 'Generate 5 high-converting subject lines for a discovery call follow-up email to a SaaS company' },
  { icon: Mail, label: 'Write welcome email', prompt: 'Write a premium welcome email for a new lead from the healthcare industry who is interested in AI voice agents' },
  { icon: RefreshCw, label: 'Improve email', prompt: 'Rewrite this follow-up email to be more engaging and increase reply rates' },
  { icon: Lightbulb, label: 'Suggest follow-up', prompt: 'Suggest the best follow-up strategy for a lead who viewed our proposal 3 times but hasn\'t responded' },
  { icon: Zap, label: 'Optimize sequence', prompt: 'Optimize our lead nurturing email sequence for better conversion rates' },
  { icon: Sparkles, label: 'Content ideas', prompt: 'Generate 5 educational email content ideas for our newsletter targeting logistics companies' },
];

const sampleResponses: Record<string, string> = {
  'Generate 5 high-converting subject lines for a discovery call follow-up email to a SaaS company': `Here are 5 high-converting subject lines for your discovery call follow-up:

1. **"Quick question about {{company}}'s automation goals"** — Personal, curiosity-driven
2. **"3 ways AI can save {{company}} 200+ hours/month"** — Value-focused with specifics
3. **"Following up on our chat — your custom roadmap is ready"** — Creates anticipation
4. **"{{firstName}}, here's what I mapped out for {{company}}"** — Personal delivery
5. **"The ROI breakdown you asked about 📊"** — Reference-based, emoji adds warmth

💡 **Pro Tips:**
- Subject lines with the recipient's name get 26% higher open rates
- Keep under 50 characters for mobile optimization
- Questions outperform statements by 18%
- Avoid spam triggers like "FREE" or "ACT NOW"`,

  'default': `I'd be happy to help! Here's what I recommend based on Vyravo AI's brand voice and best practices:

**Analysis:**
Your request involves crafting compelling email content that aligns with our premium, professional brand tone while maximizing engagement.

**Recommendations:**
1. Lead with value — always address the recipient's pain point first
2. Keep paragraphs short — 2-3 sentences max
3. Include one clear CTA
4. Personalize with merge tags: {{firstName}}, {{company}}, {{industry}}
5. End with a soft question to encourage replies

**Next Steps:**
- I can generate the full email copy
- Create A/B test variants
- Suggest optimal send times based on the recipient's timezone

Would you like me to draft the complete email?`
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1', role: 'assistant', timestamp: new Date().toISOString(),
      content: `👋 Hi! I'm your AI Writing Assistant, powered by advanced language models and trained on Vyravo AI's brand voice.\n\nI can help you:\n• **Generate** compelling subject lines & email copy\n• **Rewrite** emails for better engagement\n• **Suggest** follow-up strategies\n• **Optimize** email sequences\n• **Summarize** conversations\n• **Recommend** next actions\n\nWhat would you like to work on?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const content = text || input;
    if (!content.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = sampleResponses[content] || sampleResponses['default'];
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] lg:max-w-[70%] rounded-2xl p-4 ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-white'
                : 'bg-[#110D1F] border border-[#1E1735] text-gray-300'
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[10px] font-semibold text-violet-400">AI Assistant</span>
                </div>
              )}
              <div className="text-sm leading-relaxed whitespace-pre-line">
                {msg.content.split('**').map((part, i) =>
                  i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
                )}
              </div>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/5">
                  <button className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-violet-400 transition-colors">
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                  <button className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-violet-400 transition-colors">
                    <RefreshCw className="w-3 h-3" /> Regenerate
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs text-gray-500">AI is thinking...</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested prompts */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
          {suggestedPrompts.map((sp) => {
            const Icon = sp.icon;
            return (
              <button
                key={sp.label}
                onClick={() => handleSend(sp.prompt)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#110D1F] border border-[#1E1735] hover:border-violet-500/20 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-violet-600/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white">{sp.label}</p>
                  <p className="text-[10px] text-gray-500 truncate">{sp.prompt.slice(0, 50)}...</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0" />
              </button>
            );
          })}
        </div>
      )}

      {/* Input */}
      <div className="bg-[#110D1F] border border-[#1E1735] rounded-2xl p-3 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder="Ask me to write an email, generate subject lines, or optimize your sequences..."
          className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none resize-none min-h-[40px] max-h-32"
          rows={1}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isTyping}
          className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
