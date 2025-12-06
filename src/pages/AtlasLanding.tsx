import { useState, useEffect } from 'react';
import { Bot, Sparkles, TrendingUp, Users, Gift, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Simulated typing effect for Oliver AI
const useTypingEffect = (text: string, speed: number = 30, startDelay: number = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let index = 0;
    
    const startTyping = () => {
      const type = () => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
          timeout = setTimeout(type, speed);
        } else {
          setIsComplete(true);
        }
      };
      type();
    };

    timeout = setTimeout(startTyping, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
};

// Heatmap Component
const MiniHeatmap = () => {
  const data = [
    [0.2, 0.5, 0.8, 0.6, 0.3],
    [0.4, 0.9, 0.7, 0.5, 0.2],
    [0.6, 0.8, 0.4, 0.3, 0.7],
    [0.3, 0.4, 0.6, 0.8, 0.5],
  ];

  return (
    <div className="grid grid-cols-5 gap-1 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
      {data.flat().map((value, i) => (
        <div
          key={i}
          className="w-6 h-6 rounded-sm transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, 
              hsl(${280 - value * 80}, 80%, ${30 + value * 40}%) 0%, 
              hsl(${200 + value * 60}, 90%, ${40 + value * 30}%) 100%)`,
            opacity: 0.7 + value * 0.3,
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}
    </div>
  );
};

// Store Performance Quadrant
const StoreQuadrant = () => {
  const stores = [
    { x: 25, y: 70, size: 20, label: 'Store A', glow: true },
    { x: 65, y: 80, size: 28, label: 'Store B', glow: false },
    { x: 80, y: 30, size: 24, label: 'Store C', glow: true },
    { x: 40, y: 35, size: 18, label: 'Store X', glow: true, highlight: true },
    { x: 55, y: 55, size: 22, label: 'Store D', glow: false },
  ];

  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/10 overflow-hidden">
      {/* Axis labels */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-atlas-muted uppercase tracking-wider">Traffic →</div>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-atlas-muted uppercase tracking-wider">Performance →</div>
      
      {/* Grid lines */}
      <div className="absolute inset-4 border-l border-b border-white/10">
        <div className="absolute w-full h-px bg-white/5 top-1/2" />
        <div className="absolute h-full w-px bg-white/5 left-1/2" />
      </div>

      {/* Bubbles */}
      {stores.map((store, i) => (
        <div
          key={i}
          className={`absolute rounded-full transition-all duration-700 group cursor-pointer ${
            store.highlight ? 'animate-pulse' : ''
          }`}
          style={{
            left: `${store.x}%`,
            top: `${100 - store.y}%`,
            width: store.size,
            height: store.size,
            transform: 'translate(-50%, -50%)',
            background: store.glow 
              ? 'linear-gradient(135deg, hsl(var(--atlas-neon-blue)) 0%, hsl(var(--atlas-neon-purple)) 100%)'
              : 'hsl(var(--atlas-muted) / 0.5)',
            boxShadow: store.glow 
              ? '0 0 20px hsl(var(--atlas-neon-blue) / 0.5), 0 0 40px hsl(var(--atlas-neon-purple) / 0.3)'
              : 'none',
          }}
        >
          {store.highlight && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-atlas-glass backdrop-blur-md border border-white/20 rounded-lg px-2 py-1 text-[10px] text-atlas-neon-blue opacity-0 group-hover:opacity-100 transition-opacity">
              AI Insight: Move Store X to High Traffic Zone
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Customer Trends Chart
const CustomerTrendsChart = () => {
  const points = [20, 35, 28, 45, 52, 48, 65, 72, 68, 85];
  const maxY = 100;
  
  return (
    <div className="relative w-full h-32 mt-4">
      <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--atlas-neon-purple))" />
            <stop offset="100%" stopColor="hsl(var(--atlas-neon-blue))" />
          </linearGradient>
          <linearGradient id="trendFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--atlas-neon-blue))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--atlas-neon-blue))" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area fill */}
        <path
          d={`M 0 80 ${points.map((p, i) => `L ${(i / (points.length - 1)) * 200} ${80 - (p / maxY) * 70}`).join(' ')} L 200 80 Z`}
          fill="url(#trendFill)"
        />
        
        {/* Line */}
        <path
          d={`M ${points.map((p, i) => `${(i / (points.length - 1)) * 200} ${80 - (p / maxY) * 70}`).join(' L ')}`}
          fill="none"
          stroke="url(#trendGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Glow dots */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={(i / (points.length - 1)) * 200}
            cy={80 - (p / maxY) * 70}
            r="3"
            fill="hsl(var(--atlas-neon-blue))"
            className="drop-shadow-[0_0_6px_hsl(var(--atlas-neon-blue))]"
          />
        ))}
      </svg>
      
      {/* Input overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2 flex items-center gap-2">
        <Sparkles className="w-3 h-3 text-atlas-neon-purple" />
        <span className="text-[11px] text-atlas-muted">Create segment for churned high-value users...</span>
        <div className="w-px h-3 bg-atlas-neon-blue animate-blink" />
      </div>
    </div>
  );
};

// Rewards Trend with Prediction
const RewardsTrendChart = () => {
  const actual = [30, 42, 38, 55, 62, 58, 70];
  const predicted = [70, 78, 85, 92];
  const maxY = 100;
  
  return (
    <div className="relative w-full h-36 mt-2">
      <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
        <defs>
          <linearGradient id="rewardGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--atlas-neon-blue))" />
            <stop offset="60%" stopColor="hsl(var(--atlas-neon-purple))" />
          </linearGradient>
        </defs>
        
        {/* Actual line */}
        <path
          d={`M ${actual.map((p, i) => `${(i / 10) * 200} ${80 - (p / maxY) * 70}`).join(' L ')}`}
          fill="none"
          stroke="hsl(var(--atlas-neon-blue))"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Predicted line (dotted) */}
        <path
          d={`M ${actual.length > 0 ? (actual.length - 1) / 10 * 200 : 0} ${80 - (actual[actual.length - 1] / maxY) * 70} ${predicted.map((p, i) => `L ${((actual.length - 1 + i + 1) / 10) * 200} ${80 - (p / maxY) * 70}`).join(' ')}`}
          fill="none"
          stroke="hsl(var(--atlas-neon-purple))"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
          className="drop-shadow-[0_0_8px_hsl(var(--atlas-neon-purple))]"
        />
        
        {/* Prediction label */}
        <text
          x="180"
          y="15"
          className="fill-atlas-neon-purple text-[8px] font-medium"
        >
          AI Forecast
        </text>
      </svg>
      
      {/* Trend badge */}
      <div className="absolute top-0 right-0 flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-[10px]">
        <TrendingUp className="w-3 h-3" />
        +24% projected
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  children,
  delay = 0 
}: { 
  icon: React.ElementType; 
  title: string; 
  subtitle: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <div 
    className="group relative bg-atlas-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_60px_-15px_hsl(var(--atlas-neon-blue)/0.3)]"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Glow effect on hover */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-atlas-neon-blue/5 to-atlas-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-atlas-neon-blue/20 to-atlas-neon-purple/20 border border-white/10">
          <Icon className="w-5 h-5 text-atlas-neon-blue" />
        </div>
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="text-xs text-atlas-muted">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  </div>
);

// Main Landing Page
export default function AtlasLanding() {
  const aiResponse = "The North Region's ATV decline of 12% is primarily driven by reduced basket sizes in urban stores. Key factors include seasonal product mix shifts and increased competition from discount retailers.";
  const { displayedText, isComplete } = useTypingEffect(aiResponse, 20, 1500);

  return (
    <div className="min-h-screen bg-atlas-bg text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-atlas-neon-purple/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-atlas-neon-blue/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/[0.02] to-transparent rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-atlas-neon-blue to-atlas-neon-purple flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-atlas-neon-blue to-atlas-neon-purple blur-lg opacity-50" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Atlas AI
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm text-atlas-muted">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-white transition-colors">Demo</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-atlas-muted hover:text-white hover:bg-white/5">
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-atlas-neon-blue to-atlas-neon-purple hover:opacity-90 text-white border-0 shadow-[0_0_20px_-5px_hsl(var(--atlas-neon-blue))]">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Hero text */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-atlas-muted mb-6">
              <Sparkles className="w-4 h-4 text-atlas-neon-purple" />
              Powered by Advanced AI Analytics
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                Your AI Command Center
              </span>
              <br />
              <span className="bg-gradient-to-r from-atlas-neon-blue to-atlas-neon-purple bg-clip-text text-transparent">
                for Business Intelligence
              </span>
            </h1>
            <p className="text-xl text-atlas-muted max-w-2xl mx-auto">
              Transform complex data into actionable insights with Oliver AI. 
              Ask questions in plain English, get intelligent answers instantly.
            </p>
          </div>

          {/* Oliver AI Chat Interface */}
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-atlas-glass backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-[0_0_80px_-20px_hsl(var(--atlas-neon-blue)/0.3)]">
              {/* Chat header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-atlas-neon-blue to-atlas-neon-purple flex items-center justify-center">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-atlas-bg" />
                </div>
                <div>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    Oliver AI
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-atlas-neon-blue/20 text-atlas-neon-blue">
                      Online
                    </span>
                  </h3>
                  <p className="text-xs text-atlas-muted">Your AI Business Analyst</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto text-atlas-muted hover:text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* User message */}
              <div className="flex justify-end mb-6">
                <div className="bg-gradient-to-r from-atlas-neon-blue/20 to-atlas-neon-purple/20 border border-white/10 rounded-2xl rounded-tr-sm px-5 py-3 max-w-md">
                  <p className="text-sm text-white">Why is the North Region's ATV down?</p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-atlas-neon-blue to-atlas-neon-purple flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 space-y-4">
                  {/* Heatmap visualization */}
                  <div className="animate-fade-in">
                    <p className="text-xs text-atlas-muted mb-2 uppercase tracking-wider">Regional Performance Heatmap</p>
                    <MiniHeatmap />
                  </div>
                  
                  {/* Text response */}
                  <div className="bg-white/5 rounded-2xl rounded-tl-sm px-5 py-4 border border-white/10">
                    <p className="text-sm text-white/90 leading-relaxed">
                      {displayedText}
                      {!isComplete && <span className="inline-block w-0.5 h-4 bg-atlas-neon-blue ml-1 animate-blink" />}
                    </p>
                  </div>
                </div>
              </div>

              {/* Input area */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                  <Sparkles className="w-5 h-5 text-atlas-neon-purple" />
                  <input
                    type="text"
                    placeholder="Ask Oliver anything about your business..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-atlas-muted focus:outline-none"
                  />
                  <Button size="sm" className="bg-gradient-to-r from-atlas-neon-blue to-atlas-neon-purple hover:opacity-90 text-white border-0">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="relative z-10 px-8 py-24 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Intelligent Modules
              </span>
            </h2>
            <p className="text-atlas-muted max-w-xl mx-auto">
              A suite of AI-powered tools designed for modern business intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Atlas AI */}
            <FeatureCard
              icon={Bot}
              title="Atlas AI"
              subtitle="Store Performance Analytics"
              delay={0}
            >
              <StoreQuadrant />
            </FeatureCard>

            {/* Card 2: Segcon GenAI */}
            <FeatureCard
              icon={Users}
              title="Segcon GenAI"
              subtitle="Customer Segmentation"
              delay={100}
            >
              <CustomerTrendsChart />
            </FeatureCard>

            {/* Card 3: Predictive Loyalty */}
            <FeatureCard
              icon={Gift}
              title="Predictive Loyalty"
              subtitle="Rewards Forecasting"
              delay={200}
            >
              <RewardsTrendChart />
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-atlas-glass backdrop-blur-xl rounded-3xl border border-white/10 p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Ready to Transform Your Data?
            </h2>
            <p className="text-atlas-muted mb-8 max-w-xl mx-auto">
              Join thousands of businesses using Atlas AI to unlock actionable insights from their data.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-atlas-neon-blue to-atlas-neon-purple hover:opacity-90 text-white border-0 shadow-[0_0_30px_-5px_hsl(var(--atlas-neon-blue))]">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-atlas-muted">
            <Sparkles className="w-4 h-4 text-atlas-neon-purple" />
            Powered by Gemini
          </div>
          <div className="text-sm text-atlas-muted">
            © 2024 Atlas AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
