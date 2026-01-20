'use client';

import * as React from 'react';
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
import { HeaderSection } from '@/features/admin/HeaderSection';
import { fetchDataFromAPI } from '@/lib/btw/api';
import { Loading } from '@/features/admin/Loading';

export default function AdminPage() {
  const [chartData, setChartData] = React.useState<
    { kepengurusan: string; anggota: number }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [summary, setSummary] = React.useState([
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
  ]);

  React.useEffect(() => {
    const loadSummary = async () => {
      setIsLoading(true);
      try {
        const [kepengurusanData, divisiData, anggotaData] = await Promise.all([
          fetchDataFromAPI('kepengurusan'),
          fetchDataFromAPI('divisi'),
          fetchDataFromAPI('detail_anggota'),
        ]);

        setSummary((prev) =>
          prev.map((item) => {
            switch (item.title) {
              case 'Kepengurusan':
                return { ...item, count: kepengurusanData.length };
              case 'Divisi':
                return { ...item, count: divisiData.length };
              case 'Anggota':
                return { ...item, count: anggotaData.length };
              default:
                return item;
            }
          }),
        );

        const chartData = kepengurusanData.map((k: any) => {
          const anggotaCount = anggotaData.filter(
            (a: any) => a.kepengurusan_id === k.id,
          ).length;
          return { kepengurusan: k.nama_kepengurusan, anggota: anggotaCount };
        });

        setChartData(chartData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSummary();
  }, []);

  if (isLoading) {
    return <Loading />; // <-- Loading keseluruhan page
  }

  return (
    <>
      <HeaderSection page="Home" title="Dashboard Admin Code124" />

      <div className="card flex gap-5 rounded-xl border border-black px-6 py-4 text-white shadow-lg">
        {summary.map((item, index) => (
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
        <DashboardChart data={chartData} />
      </div>
    </>
  );
}
