import { AreaChartSimple } from "@/components/Charts/AreaChart";
import { AreaChartStacked } from "@/components/Charts/AreaChartStacked";
import { BarChartMultiple } from "@/components/Charts/BarChartMultiple";
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
  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Analytics</h1>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <BarChartMultiple />
        {/* <Card>
          <CardHeader>
            <CardTitle>Dash Header</CardTitle>
            <CardDescription>Dash Desc</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <AreaChartStacked />
            </div>
          </CardContent>
        </Card> */}
        <AreaChartSimple />
      </div>
    </main>
  );
}
