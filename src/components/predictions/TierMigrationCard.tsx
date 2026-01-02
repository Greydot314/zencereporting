import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, ArrowRight, Users, RefreshCw, AlertTriangle } from "lucide-react";
import { TierMigrationData } from "@/types/predictions";

interface TierMigrationCardProps {
  data: TierMigrationData;
}

export const TierMigrationCard = ({ data }: TierMigrationCardProps) => {
  const upgradeFlows = data.flows.filter(f => 
    (f.from === "Bronze" && f.to === "Silver") ||
    (f.from === "Silver" && f.to === "Gold") ||
    (f.from === "Gold" && f.to === "Platinum")
  );

  const downgradeFlows = data.flows.filter(f => 
    (f.from === "Silver" && f.to === "Bronze") ||
    (f.from === "Gold" && f.to === "Silver") ||
    (f.from === "Platinum" && f.to === "Gold")
  );

  const tierColors: Record<string, string> = {
    "Platinum": "bg-purple-100 text-purple-700 border-purple-200",
    "Gold": "bg-amber-100 text-amber-700 border-amber-200",
    "Silver": "bg-slate-100 text-slate-700 border-slate-200",
    "Bronze": "bg-orange-100 text-orange-700 border-orange-200"
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg">Tier Migration Forecast</CardTitle>
            <p className="text-sm text-muted-foreground">30-day predicted movements</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          <RefreshCw className="h-3 w-3 mr-1" />
          {data.lastUpdated}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border bg-emerald-50/50 text-center">
            <ArrowUpRight className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
            <div className="text-xl font-bold text-emerald-700">{data.summary.totalUpgrades.toLocaleString()}</div>
            <div className="text-xs text-emerald-600">Upgrades</div>
          </div>
          <div className="p-3 rounded-lg border bg-red-50/50 text-center">
            <ArrowDownRight className="h-5 w-5 text-red-500 mx-auto mb-1" />
            <div className="text-xl font-bold text-red-700">{data.summary.totalDowngrades.toLocaleString()}</div>
            <div className="text-xs text-red-600">Downgrades</div>
          </div>
          <div className="p-3 rounded-lg border bg-muted/50 text-center">
            <ArrowRight className="h-5 w-5 text-primary mx-auto mb-1" />
            <div className="text-xl font-bold text-foreground">+{data.summary.netChange.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Net Change</div>
          </div>
        </div>

        {/* Upgrade Opportunities */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
            Upgrade Opportunities
          </h4>
          <div className="space-y-2">
            {data.upgradeOpportunities.map((opp, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg border bg-emerald-50/30">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{opp.tier}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {opp.nearThreshold.toLocaleString()} near threshold
                  </span>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                  {Math.round(opp.probability * 100)}% likely
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Downgrade Alerts */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            Downgrade Alerts
          </h4>
          <div className="space-y-2">
            {data.downgradeAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg border bg-red-50/30">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-red-200 text-red-700">{alert.tier}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {alert.atRisk.toLocaleString()} at risk
                  </span>
                </div>
                <Badge className="bg-red-100 text-red-700 text-xs">
                  {Math.round(alert.probability * 100)}% probability
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Migration Flows */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-xs font-medium text-muted-foreground mb-2">Expected Upgrades</h5>
            {upgradeFlows.map((flow, index) => (
              <div key={index} className="flex items-center gap-2 mb-1 text-sm">
                <span className={`px-2 py-0.5 rounded text-xs ${tierColors[flow.from]}`}>{flow.from}</span>
                <ArrowRight className="h-3 w-3 text-emerald-500" />
                <span className={`px-2 py-0.5 rounded text-xs ${tierColors[flow.to]}`}>{flow.to}</span>
                <span className="text-muted-foreground ml-auto">{flow.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div>
            <h5 className="text-xs font-medium text-muted-foreground mb-2">Expected Downgrades</h5>
            {downgradeFlows.map((flow, index) => (
              <div key={index} className="flex items-center gap-2 mb-1 text-sm">
                <span className={`px-2 py-0.5 rounded text-xs ${tierColors[flow.from]}`}>{flow.from}</span>
                <ArrowRight className="h-3 w-3 text-red-500" />
                <span className={`px-2 py-0.5 rounded text-xs ${tierColors[flow.to]}`}>{flow.to}</span>
                <span className="text-muted-foreground ml-auto">{flow.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
