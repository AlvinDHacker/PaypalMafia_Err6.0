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
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Dash Header</CardTitle>
            <CardDescription>Dash Desc</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {/* <div className="flex justify-center">
                <Loader2 className="animate-spin" />
              </div> */}
              <BarChartMultiple />
            </div>
          </CardContent>
          {/* <CardFooter>
            <Button
              asChild
              variant="secondary"
              className="flex items-center gap-2"
            >
              <span>
                <Eye className="w-4 h-4" /> View
              </span>
            </Button>
          </CardFooter> */}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dash Header</CardTitle>
            <CardDescription>Dash Desc</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {/* <div className="flex justify-center">
                <Loader2 className="animate-spin" />
              </div> */}
              <AreaChartStacked />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
