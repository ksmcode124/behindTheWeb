import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, ChevronRight } from "lucide-react";
import { DashboardChart } from "./components/dashboard-chart";

export default function AdminPage() {
    return <>
        <h1 className="text-3xl font-bold italic">Dashboard Admin Web CODE124</h1>
        <div className="card border flex rounded-xl p-2 gap-2">
            <Card className="w-full text-center">
                <CardHeader>
                    <CardTitle className="flex gap-2 justify-center items-center"><Building /> Kepengurusan</CardTitle>
                </CardHeader>
                <CardContent>
                    <span className="text-5xl font-bold">4</span>
                </CardContent>
                <CardFooter>
                    <div className="flex gap-2 justify-center items-center w-full">
                        More Info <ChevronRight />
                    </div>
                </CardFooter>
            </Card>
            <Card className="w-full text-center">
                <CardHeader>
                    <CardTitle className="flex gap-2 justify-center items-center"><Building /> Kepengurusan</CardTitle>
                </CardHeader>
                <CardContent>
                    <span className="text-5xl font-bold">4</span>
                </CardContent>
                <CardFooter>
                    <div className="flex gap-2 justify-center items-center w-full">
                        More Info <ChevronRight />
                    </div>
                </CardFooter>
            </Card>
            <Card className="w-full text-center">
                <CardHeader>
                    <CardTitle className="flex gap-2 justify-center items-center"><Building /> Kepengurusan</CardTitle>
                </CardHeader>
                <CardContent>
                    <span className="text-5xl font-bold">4</span>
                </CardContent>
                <CardFooter>
                    <div className="flex gap-2 justify-center items-center w-full">
                        More Info <ChevronRight />
                    </div>
                </CardFooter>
            </Card>
        </div>
        <div className="mt-6">
            <DashboardChart />
        </div>
    </>
}