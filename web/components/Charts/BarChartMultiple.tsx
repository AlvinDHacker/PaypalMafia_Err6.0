"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export interface MultipleChartInterface {
  timeline: string;
  value1: Number;
  value2: Number;
}

const chartConfig = {
  value1: {
    label: "value1",
    color: "hsl(var(--chart-1))",
  },
  value2: {
    label: "value2",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartMultiple({ data }: { data: MultipleChartInterface[] }) {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timeline"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="value1" fill="var(--color-value1)" radius={4} />
            <Bar dataKey="value2" fill="var(--color-value2)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
