import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelCatalog } from "@/components/model-studio/ModelCatalog";
import { MyModels } from "@/components/model-studio/MyModels";
import { RunHistory } from "@/components/model-studio/RunHistory";
import { ModelInsights } from "@/components/model-studio/ModelInsights";
import { ConfigDrawer } from "@/components/model-studio/ConfigDrawer";
import type { CatalogModel } from "@/data/modelStudioMockData";

const ModelStudio = () => {
  const [activeTab, setActiveTab] = useState("catalog");
  const [insightsModelName, setInsightsModelName] = useState<string | undefined>();
  const [showInsights, setShowInsights] = useState(false);
  const [drawerModel, setDrawerModel] = useState<CatalogModel | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleConfigureModel = (model: CatalogModel) => {
    setDrawerModel(model);
    setDrawerOpen(true);
  };

  const handleViewResults = (modelName?: string) => {
    setInsightsModelName(modelName);
    setShowInsights(true);
  };

  const handleBackFromInsights = () => {
    setShowInsights(false);
    setInsightsModelName(undefined);
  };

  if (showInsights) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <ModelInsights onBack={handleBackFromInsights} modelName={insightsModelName} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Model Studio</h1>
        <p className="text-sm text-muted-foreground mt-1">Discover, configure, run, and evaluate AI/ML segmentation models — no code required.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="catalog">Model Catalog</TabsTrigger>
          <TabsTrigger value="my-models">My Models</TabsTrigger>
          <TabsTrigger value="run-history">Run History</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="animate-in fade-in-50 duration-300">
          <ModelCatalog
            onConfigureModel={handleConfigureModel}
            onViewSampleOutput={() => handleViewResults()}
          />
        </TabsContent>

        <TabsContent value="my-models" className="animate-in fade-in-50 duration-300">
          <MyModels
            onViewResults={handleViewResults}
            onNewModel={() => setActiveTab("catalog")}
          />
        </TabsContent>

        <TabsContent value="run-history" className="animate-in fade-in-50 duration-300">
          <RunHistory onViewReport={handleViewResults} />
        </TabsContent>

        <TabsContent value="insights" className="animate-in fade-in-50 duration-300">
          <ModelInsights onBack={() => setActiveTab("catalog")} />
        </TabsContent>
      </Tabs>

      <ConfigDrawer
        model={drawerModel}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default ModelStudio;
