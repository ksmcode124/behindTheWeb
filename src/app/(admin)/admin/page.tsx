import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building, ChevronRight } from 'lucide-react';
import { DashboardChart } from '../../../features/admin/dashboard-chart';

export default function AdminPage() {
  return (
    <>
      <h1 className="text-3xl font-bold italic">Dashboard Admin Web CODE124</h1>
      <div className="card flex gap-2 rounded-xl border p-2">
        <Card className="w-full text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Building /> Kepengurusan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-5xl font-bold">4</span>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center justify-center gap-2">
              More Info <ChevronRight />
            </div>
          </CardFooter>
        </Card>
        <Card className="w-full text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Building /> Kepengurusan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-5xl font-bold">4</span>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center justify-center gap-2">
              More Info <ChevronRight />
            </div>
          </CardFooter>
        </Card>
        <Card className="w-full text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Building /> Kepengurusan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-5xl font-bold">4</span>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center justify-center gap-2">
              More Info <ChevronRight />
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-6">
        <DashboardChart />
      </div>
    </>
  );
}
