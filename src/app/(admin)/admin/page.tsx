import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building, ChevronRight, User, Users } from 'lucide-react';
import { DashboardChart } from '../../../features/admin/DashboardChart';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const SUMMARY_CARD = [
  {
    title: 'Kepengurusan',
    icon: Building,
    count: 0,
    link: '/admin/kepengurusan',
    backgroundColor: 'bg-[#FFB024]',
  },
  {
    title: 'Divisi',
    icon: Users,
    count: 0,
    link: '/admin/divisi',
    backgroundColor: 'bg-[#4EB99F]',
  },
  {
    title: 'Anggota',
    icon: User,
    count: 0,
    link: '/admin/anggota',
    backgroundColor: 'bg-[#058587]',
  },
];

export default function AdminPage() {
  return (
    <>
      <h1 className="text-3xl font-bold italic">Dashboard Admin Web CODE124</h1>
      <div className="card flex gap-5 rounded-xl border border-black px-6 py-4 text-white shadow-lg">
        {SUMMARY_CARD.map((item, index) => (
          <Card
            key={index}
            className={cn(
              'flex w-full flex-col justify-between p-0 pt-8 text-center shadow-md',
              item.backgroundColor,
            )}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white">
                <item.icon /> {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <span className="text-5xl font-bold text-white">
                {item.count}
              </span>
            </CardContent>
            <CardFooter className="h-full bg-black/40 text-white">
              <Link
                className="flex w-full items-center justify-center gap-2"
                href={item.link}
              >
                More Info <ChevronRight />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <DashboardChart />
      </div>
    </>
  );
}
