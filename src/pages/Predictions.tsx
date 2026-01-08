import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp } from "lucide-react";
import { SalesForecastCard } from "@/components/predictions/SalesForecastCard";
import { ChurnPredictionCard } from "@/components/predictions/ChurnPredictionCard";
import { CLVPredictionCard } from "@/components/predictions/CLVPredictionCard";
import { CustomerActivityCard } from "@/components/predictions/CustomerActivityCard";
import { ProductDemandCard } from "@/components/predictions/ProductDemandCard";
import { DecisionImpactRadar } from "@/components/predictions/DecisionImpactRadar";
import {
  mockForecastData,
  mockChurnData,
  mockCLVData,
  mockProductDemandData,
  mockDecisionImpactRadarData
} from "@/data/predictionsMockData";

const Predictions = () => {
  return (
    <main className="flex-1 overflow-auto bg-background pt-20">
      <div className="p-6 md:p-8 pt-12 max-w-[1600px] mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Predictive Analytics</h1>
              <p className="text-sm text-muted-foreground">
                AI-powered forecasts and scenario planning
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh All Predictions
          </Button>
        </div>

        {/* Sales Forecast - Full Width */}
        <SalesForecastCard data={mockForecastData} />

        <div className="h-px bg-border" />

        {/* Churn & CLV Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <ChurnPredictionCard data={mockChurnData} />
          <CLVPredictionCard data={mockCLVData} />
        </div>

        <div className="h-px bg-border" />

        {/* Customer Activity & Product Demand Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <CustomerActivityCard />
          <ProductDemandCard data={mockProductDemandData} />
        </div>

        <div className="h-px bg-border" />

        {/* Decision Impact Radar - Full Width */}
        <DecisionImpactRadar data={mockDecisionImpactRadarData} />
      </div>
    </main>
  );
};

export default Predictions;
