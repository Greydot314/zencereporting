import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AgentSidebar } from "@/components/agents/AgentSidebar";
import { AgentChatMessage } from "@/components/agents/AgentChatMessage";
import { AgentTypingIndicator } from "@/components/agents/AgentTypingIndicator";
import { ToolActionMessage } from "@/components/agents/ToolActionMessage";
import { WorkspacePanel } from "@/components/agents/WorkspacePanel";
import { FollowUpSuggestions } from "@/components/ai-chat/FollowUpSuggestions";
import { Agent, AgentId, AgentMessage, WorkspaceWidget } from "@/types/agents";
import {
  agents as defaultAgents,
  dataAgentConversation,
  dataWorkspaceWidgets,
  campaignAgentConversation,
  campaignWorkspaceWidgets,
  productAgentConversation,
  productWorkspaceWidgets,
  toolActions,
} from "@/data/agentMockData";

const scenarioMap: Record<AgentId, { messages: AgentMessage[]; widgets: WorkspaceWidget[] }> = {
  data: { messages: dataAgentConversation, widgets: dataWorkspaceWidgets },
  campaign: { messages: campaignAgentConversation, widgets: campaignWorkspaceWidgets },
  product: { messages: productAgentConversation, widgets: productWorkspaceWidgets },
};

const agentColors: Record<AgentId, string> = {
  data: "agent-data",
  campaign: "agent-campaign",
  product: "agent-product",
};

const AIChat = () => {
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);
  const [activeAgentId, setActiveAgentId] = useState<AgentId>("data");
  const [conversations, setConversations] = useState<Record<AgentId, AgentMessage[]>>({
    data: [],
    campaign: [],
    product: [],
  });
  const [workspaces, setWorkspaces] = useState<Record<AgentId, WorkspaceWidget[]>>({
    data: [],
    campaign: [],
    product: [],
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToolActions, setShowToolActions] = useState(false);
  const [toolCompletedCount, setToolCompletedCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeMessages = conversations[activeAgentId];
  const activeWidgets = workspaces[activeAgentId];
  const activeAgent = agents.find((a) => a.id === activeAgentId)!;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages, isLoading, scrollToBottom]);

  const setAgentStatus = (id: AgentId, status: Agent["status"]) => {
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const simulateAgentResponse = (agentId: AgentId) => {
    const scenario = scenarioMap[agentId];
    const agentResponse = scenario.messages.find((m) => m.role === "agent");
    if (!agentResponse) return;

    setAgentStatus(agentId, "thinking");
    setShowToolActions(true);
    setToolCompletedCount(0);

    const actions = toolActions[agentId];
    let step = 0;

    const toolInterval = setInterval(() => {
      step++;
      setToolCompletedCount(step);
      if (step >= actions.length) {
        clearInterval(toolInterval);
        setTimeout(() => {
          setShowToolActions(false);
          setAgentStatus(agentId, "active");

          // Add streaming message (empty initially)
          const newMsgId = `${agentId}-${Date.now()}`;
          const newMsg: AgentMessage = {
            ...agentResponse,
            id: newMsgId,
            timestamp: new Date().toISOString(),
            isStreaming: true,
            streamedContent: "",
            followUps: agentResponse.followUps,
          };
          setConversations((prev) => ({
            ...prev,
            [agentId]: [...prev[agentId], newMsg],
          }));

          // Load workspace immediately
          setWorkspaces((prev) => ({
            ...prev,
            [agentId]: scenario.widgets,
          }));

          // Stream words
          const words = agentResponse.content.split(" ");
          let wordIndex = 0;
          const streamInterval = setInterval(() => {
            wordIndex++;
            if (wordIndex <= words.length) {
              const partial = words.slice(0, wordIndex).join(" ");
              setConversations((prev) => ({
                ...prev,
                [agentId]: prev[agentId].map((m) =>
                  m.id === newMsgId
                    ? { ...m, streamedContent: partial, isStreaming: wordIndex < words.length }
                    : m
                ),
              }));
            }
            if (wordIndex >= words.length) {
              clearInterval(streamInterval);
              // Finalize
              setConversations((prev) => ({
                ...prev,
                [agentId]: prev[agentId].map((m) =>
                  m.id === newMsgId ? { ...m, isStreaming: false, streamedContent: undefined } : m
                ),
              }));
              setIsLoading(false);
            }
          }, 30);
        }, 600);
      }
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: AgentMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      agentId: activeAgentId,
      content: input,
      timestamp: new Date().toISOString(),
    };

    setConversations((prev) => ({
      ...prev,
      [activeAgentId]: [...prev[activeAgentId], userMsg],
    }));
    setInput("");
    setIsLoading(true);

    setTimeout(() => simulateAgentResponse(activeAgentId), 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSelectAgent = (id: AgentId) => {
    setActiveAgentId(id);
  };

  const handleFollowUp = (suggestion: string) => {
    setInput(suggestion);
  };

  const lastAgentMessage = [...activeMessages].reverse().find((m) => m.role === "agent");

  // Quick prompts per agent
  const quickPrompts: Record<AgentId, string[]> = {
    data: ["Analyze last quarter revenue", "Show customer segments", "Top performing products"],
    campaign: ["Optimize Diwali campaign", "Compare channel ROI", "Audience segmentation insights"],
    product: ["How does CRM integration work?", "Show API documentation", "Feature comparison"],
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background overflow-hidden">
      {/* Left: Agent Sidebar */}
      <AgentSidebar
        agents={agents}
        activeAgentId={activeAgentId}
        onSelectAgent={handleSelectAgent}
      />

      {/* Center: Chat */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
            {activeMessages.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `hsl(var(--${agentColors[activeAgentId]}) / 0.1)` }}
                >
                  {activeAgentId === "data" && <svg className="h-6 w-6" style={{ color: `hsl(var(--${agentColors[activeAgentId]}))` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>}
                  {activeAgentId === "campaign" && <svg className="h-6 w-6" style={{ color: `hsl(var(--${agentColors[activeAgentId]}))` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 11 18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>}
                  {activeAgentId === "product" && <svg className="h-6 w-6" style={{ color: `hsl(var(--${agentColors[activeAgentId]}))` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>}
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-1">{activeAgent.name}</h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">{activeAgent.description}</p>

                <div className="flex flex-wrap justify-center gap-2 max-w-md">
                  {quickPrompts[activeAgentId].map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(prompt)}
                      className="px-3.5 py-2 rounded-full bg-card border border-border hover:border-muted-foreground/30 transition-all text-xs text-foreground"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {activeMessages.map((msg) => (
                  <AgentChatMessage key={msg.id} message={msg} />
                ))}

                {/* Tool actions */}
                {isLoading && showToolActions && (
                  <div className="flex gap-3 animate-fade-in">
                    <div className="w-8 h-8" /> {/* spacer for alignment */}
                    <div className="flex-1">
                      <ToolActionMessage
                        actions={toolActions[activeAgentId]}
                        completedCount={toolCompletedCount}
                        colorVar={agentColors[activeAgentId]}
                      />
                    </div>
                  </div>
                )}

                {/* Typing indicator */}
                {isLoading && !showToolActions && (
                  <AgentTypingIndicator agentId={activeAgentId} />
                )}

                {/* Follow-up chips */}
                {!isLoading && lastAgentMessage?.followUps && !lastAgentMessage.isStreaming && (
                  <div className="pl-11">
                    <FollowUpSuggestions
                      suggestions={lastAgentMessage.followUps}
                      onSelect={handleFollowUp}
                    />
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border p-3 bg-card">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask ${activeAgent.name}...`}
                className="pr-12 min-h-[48px] max-h-[120px] resize-none text-sm bg-secondary/50 border-border focus:border-primary rounded-xl placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 bottom-1.5 h-8 w-8 rounded-lg"
                disabled={!input.trim() || isLoading}
                style={{ backgroundColor: `hsl(var(--${agentColors[activeAgentId]}))` }}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-1.5">
              Enter to send · Shift+Enter for new line
            </p>
          </form>
        </div>
      </div>

      {/* Right: Workspace */}
      <div className="w-80 xl:w-96 flex flex-col bg-background shrink-0 hidden lg:flex">
        <WorkspacePanel agentId={activeAgentId} widgets={activeWidgets} />
      </div>
    </div>
  );
};

export default AIChat;
