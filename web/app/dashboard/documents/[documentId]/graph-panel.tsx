// GraphPanel.tsx
"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useState } from "react";
import { useAction } from "convex/react";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F", "#FFBB28", "#FF8042"];

export default function GraphPanel({ 
  documentId,
}: { 
  documentId: Id<"documents">; 
}) {
  const document = useQuery(api.documents.getDocument, { documentId });
  const generateGraphs = useAction(api.documents.generateGraphs);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!document) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Analytics</h2>
        {new Array(2).fill("").map((_, i) => (
          <Card key={i} className="w-full h-64">
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const graphData = document.graphData || [];
  
  const handleGenerateGraphs = async () => {
    try {
      setIsGenerating(true);
      await generateGraphs({ documentId });
    } catch (error) {
      console.error("Error generating graphs:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (graphData.length === 0) {
    return (
      <div className="mt-4">
        <Card className="p-8 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">No analytics available</h3>
          <p className="text-muted-foreground text-center mb-4">
            Generate graphs to visualize insights from this document.
          </p>
          <Button 
            onClick={handleGenerateGraphs}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Graphs"}
          </Button>
        </Card>
      </div>
    );
  }

  const renderChart = (chart: any, index: number) => {
    const { chartType, detailArr } = chart;
    
    switch (chartType) {
      case 'simpleareachart':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={detailArr.map((item: any) => ({
                name: item.timeline,
                value: item.value
              }))}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'multiplebarchart':
        // Get all value keys (value1, value2, etc.) except 'timeline'
        const valueKeys = Object.keys(detailArr[0] || {}).filter(key => key !== 'timeline');
        
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={detailArr.map((item: any) => ({
                name: item.timeline,
                ...valueKeys.reduce((acc: any, key: string) => {
                  acc[key] = item[key];
                  return acc;
                }, {})
              }))}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {valueKeys.map((key, i) => (
                <Bar key={key} dataKey={key} fill={COLORS[i % COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'piechart':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={detailArr.map((item: any) => ({
                  name: item.label,
                  value: item.value
                }))}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {detailArr.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => Number(value).toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'textradchart':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={detailArr.map((item: any) => ({
              subject: item.label,
              value: item.value
            }))}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Values" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Unsupported chart type: {chartType}</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 mt-4">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {graphData.map((chart: any, i: number) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                {chart.chartType === 'simpleareachart' ? 'Trend Analysis' :
                 chart.chartType === 'multiplebarchart' ? 'Comparison Analysis' :
                 chart.chartType === 'piechart' ? 'Distribution Analysis' :
                 chart.chartType === 'textradchart' ? 'Multi-dimensional Analysis' :
                 `Chart ${i + 1}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderChart(chart, i)}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}