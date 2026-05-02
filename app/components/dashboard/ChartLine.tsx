"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DespesaPorMes } from "@/app/services/camaraApi";
import { formatCurrencyBRL } from "@/app/services/formatters";
import { EmptyState } from "@/app/components/ui/EmptyState";

type ChartLineProps = {
  data: DespesaPorMes[];
};

export function ChartLine({ data }: ChartLineProps) {
  if (data.length === 0) {
    return <EmptyState message="Nenhuma evolução temporal encontrada." />;
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 16 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(value) => formatCurrencyBRL(Number(value))} width={90} />
          <Tooltip
            formatter={(value) => [formatCurrencyBRL(Number(value)), "Total"]}
            labelFormatter={(label) => `Mês: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#059669"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
