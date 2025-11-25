import { MessageSquare, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Thread {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  category: "today" | "yesterday" | "week";
}

interface ThreadListProps {
  threads: Thread[];
  activeThreadId: string;
  onThreadSelect: (id: string) => void;
  onNewThread: () => void;
}

export const ThreadList = ({ threads, activeThreadId, onThreadSelect, onNewThread }: ThreadListProps) => {
  const groupedThreads = {
    today: threads.filter(t => t.category === "today"),
    yesterday: threads.filter(t => t.category === "yesterday"),
    week: threads.filter(t => t.category === "week"),
  };

  return (
    <div className="w-72 border-r border-border bg-card/50 backdrop-blur-xl flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search threads..." 
            className="pl-9 bg-background/50"
          />
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-b border-border/50">
        <Button 
          onClick={onNewThread}
          className="w-full gap-2"
          variant="default"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Thread List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {Object.entries(groupedThreads).map(([category, categoryThreads]) => {
            if (categoryThreads.length === 0) return null;
            
            return (
              <div key={category}>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  {category}
                </h4>
                <div className="space-y-1">
                  {categoryThreads.map((thread) => (
                    <button
                      key={thread.id}
                      onClick={() => onThreadSelect(thread.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg transition-all group hover:bg-accent/50",
                        activeThreadId === thread.id && "bg-accent"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {thread.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {thread.preview}
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            {thread.timestamp}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
