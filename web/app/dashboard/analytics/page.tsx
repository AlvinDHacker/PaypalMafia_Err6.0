import {
  AreaChartSimple,
  AreaChartSimpleInterface,
} from "@/components/Charts/AreaChart";
import { AreaChartStacked } from "@/components/Charts/AreaChartStacked";
import { BarChartMultiple } from "@/components/Charts/BarChartMultiple";
import { LabelledPieChart } from "@/components/Charts/LabelledPieChart";
import { TextRadialChart } from "@/components/Charts/TextRadialChart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const simpleareachart = [
    { timeline: "January", value: 186 },
    { timeline: "February", value: 305 },
    { timeline: "March", value: 237 },
    { timeline: "April", value: 73 },
    { timeline: "May", value: 209 },
    { timeline: "June", value: 214 },
  ];

  const multiplebarchart = [
    { timeline: "January", value1: 186, value2: 160 },
    { timeline: "February", value1: 305, value2: 200 },
    { timeline: "March", value1: 237, value2: 120 },
    { timeline: "April", value1: 73, value2: 190 },
    { timeline: "May", value1: 209, value2: 130 },
    { timeline: "June", value1: 214, value2: 140 },
  ];

  const piechart = [
    { label: "chrome", value: 275, fill: "var(--color-chrome)" },
    { label: "safari", value: 200, fill: "var(--color-safari)" },
    { label: "firefox", value: 187, fill: "var(--color-firefox)" },
    { label: "edge", value: 173, fill: "var(--color-edge)" },
    { label: "other", value: 90, fill: "var(--color-other)" },
  ];

  const textradchart = [
    { label: "chrome", value: 275, fill: "var(--color-safari)" },
  ];

  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Analytics</h1>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 pb-20">
        <BarChartMultiple data={multiplebarchart} />
        <AreaChartSimple data={simpleareachart} />
        <AreaChartStacked data={multiplebarchart} />
        <LabelledPieChart data={piechart} />
        <TextRadialChart data={textradchart} />
      </div>
    </main>
  );
}
