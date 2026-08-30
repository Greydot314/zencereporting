import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { WHATS_NEW_VERSION, currentRelease, type WhatsNewItem } from "@/data/whatsNew";

const STORAGE_KEY = "zence:whats-new:last-seen-version";
export const WHATS_NEW_EVENT = "zence:open-whats-new";

/** Call from anywhere (e.g. a header button) to re-open the release notes. */
export const openWhatsNew = () => window.dispatchEvent(new Event(WHATS_NEW_EVENT));

const tagStyles: Record<WhatsNewItem["tag"], string> = {
  New: "bg-primary/10 text-primary border-primary/20",
  Improved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Fixed: "bg-amber-100 text-amber-700 border-amber-200",
};

export const WhatsNewDialog = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const release = currentRelease();

  useEffect(() => {
    // auto-open once per user, per version
    try {
      if (localStorage.getItem(STORAGE_KEY) !== WHATS_NEW_VERSION) {
        const t = setTimeout(() => setOpen(true), 800);
        return () => clearTimeout(t);
      }
    } catch {
      /* storage blocked — skip auto-open */
    }
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(WHATS_NEW_EVENT, handler);
    return () => window.removeEventListener(WHATS_NEW_EVENT, handler);
  }, []);

  const markSeen = () => {
    try {
      localStorage.setItem(STORAGE_KEY, WHATS_NEW_VERSION);
    } catch {
      /* ignore */
    }
  };

  const close = () => {
    markSeen();
    setOpen(false);
  };

  const go = (route?: string) => {
    if (!route) return;
    close();
    navigate(route);
  };

  if (!release) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : close())}>
      <DialogContent className="max-w-lg w-[calc(100vw-2rem)] p-0 overflow-hidden gap-0 [&>button]:hidden rounded-2xl">
        {/* Header — subtle */}
        <div className="relative px-5 pt-5 pb-4 border-b border-border bg-secondary/10">
          <button
            onClick={close}
            className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              What's new · {release.date}
            </span>
          </div>
          <DialogTitle className="text-sm font-semibold text-foreground leading-snug pr-6">{release.headline}</DialogTitle>
          <DialogDescription className="text-[11px] text-muted-foreground mt-0.5">Version {release.version}</DialogDescription>
        </div>

        {/* Items */}
        <ScrollArea className="max-h-[400px]">
          <div className="p-4 space-y-2.5">
            {release.items.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-secondary/10 p-3 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <Badge variant="outline" className={`text-[9px] h-4 px-1.5 ${tagStyles[item.tag]}`}>
                        {item.tag}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    {item.route && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-1.5 h-7 px-2 -ml-2 text-xs text-primary gap-1"
                        onClick={() => go(item.route)}
                      >
                        {item.routeLabel ?? "Take me there"}
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/20">
          <p className="text-[10px] text-muted-foreground">
            You'll see this again only when we ship something new.
          </p>
          <Button size="sm" className="h-8 text-xs" onClick={close}>
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsNewDialog;
