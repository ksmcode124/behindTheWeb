'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

interface DashboardChartProps {
  data: { kepengurusan: string; anggota: number }[];
}

const chartConfig = {
  anggota: {
    label: 'Anggota',
    color: '#102F41',
  },
} satisfies ChartConfig;

export function DashboardChart({ data }: DashboardChartProps) {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border p-4">
      <ChartContainer config={chartConfig} className="w-full">
        <BarChart accessibilityLayer data={data}>
          <defs>
            <linearGradient id="anggotaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#102F41" />
              <stop offset="100%" stopColor="#DBFCFF" />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} />

          <YAxis tickLine={false} axisLine={false} tickMargin={10} />

          <XAxis
            dataKey="kepengurusan"
            interval={0}
            textAnchor="middle"
            tickLine={false}
            axisLine={false}
          />

          <ChartTooltip content={<ChartTooltipContent />} />

          <Bar dataKey="anggota" fill="url(#anggotaGradient)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
