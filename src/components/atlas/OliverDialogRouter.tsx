import { OliverInsightDialog } from "./OliverInsightDialog";
import { OliverChatDialog } from "./OliverChatDialog";
import { OliverBriefingSheet } from "./OliverBriefingSheet";
import { OliverCardStackDialog } from "./OliverCardStackDialog";

// Per-KPI variant assignment so each card showcases a different design
const variantByKpi: Record<string, "v1" | "v2" | "v3" | "v4"> = {
  "Total Sales": "v1",
  "Total Customers": "v1",
  "Engaged Customer": "v2",
  "Repeat Sales %": "v2",
  "Total Bills": "v3",
  "Total Quantity": "v3",
  "Points Issued": "v4",
  "Points Redeemed": "v4",
  "Visit Per Customer": "v2",
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kpi: string;
}

export const OliverDialogRouter = ({ open, onOpenChange, kpi }: Props) => {
  const variant = variantByKpi[kpi] ?? "v1";
  const props = { open, onOpenChange, kpi };

  if (variant === "v2") return <OliverChatDialog {...props} />;
  if (variant === "v3") return <OliverBriefingSheet {...props} />;
  if (variant === "v4") return <OliverCardStackDialog {...props} />;
  return <OliverInsightDialog {...props} />;
};
