"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
import { MultipleChartInterface } from "./BarChartMultiple";

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

export function AreaChartStacked({ data }: { data: MultipleChartInterface[] }) {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timeline"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="value2"
              type="natural"
              fill="var(--color-value2)"
              fillOpacity={0.4}
              stroke="var(--color-value2)"
              stackId="a"
            />
            <Area
              dataKey="value1"
              type="natural"
              fill="var(--color-value1)"
              fillOpacity={0.4}
              stroke="var(--color-value1)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
