"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DespesaPorDeputado } from "@/app/services/camaraApi";
import { formatCurrencyBRL } from "@/app/services/formatters";
import { EmptyState } from "@/app/components/ui/EmptyState";

type ChartBarProps = {
  data: DespesaPorDeputado[];
};

export function ChartBar({ data }: ChartBarProps) {
  if (data.length === 0) {
    return <EmptyState message="Nenhuma despesa encontrada para comparar." />;
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 48 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="nome"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={70}
          />
          <YAxis tickFormatter={(value) => formatCurrencyBRL(Number(value))} width={90} />
          <Tooltip
            formatter={(value) => [formatCurrencyBRL(Number(value)), "Total"]}
            labelFormatter={(label) => `Deputado: ${label}`}
          />
          <Bar dataKey="total" fill="#059669" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
