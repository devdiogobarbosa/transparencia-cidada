import { BarChart3, Calculator, Users } from "lucide-react";
import { formatCurrencyBRL, formatIntegerBR } from "@/app/services/formatters";

type MetricsCardsProps = {
  totalDeputados: number;
  totalDespesas: number;
  mediaDespesas: number;
};

const cardClass =
  "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900";

export function MetricsCards({ totalDeputados, totalDespesas, mediaDespesas }: MetricsCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <article className={cardClass}>
        <Users className="mb-4 text-emerald-600 dark:text-emerald-400" size={28} />
        <p className="text-sm text-slate-500 dark:text-slate-400">Total de deputados exibidos</p>
        <strong className="mt-2 block text-3xl text-slate-950 dark:text-white">
          {formatIntegerBR(totalDeputados)}
        </strong>
      </article>

      <article className={cardClass}>
        <BarChart3 className="mb-4 text-emerald-600 dark:text-emerald-400" size={28} />
        <p className="text-sm text-slate-500 dark:text-slate-400">Total de despesas</p>
        <strong className="mt-2 block text-3xl text-slate-950 dark:text-white">
          {formatCurrencyBRL(totalDespesas)}
        </strong>
      </article>

      <article className={cardClass}>
        <Calculator className="mb-4 text-emerald-600 dark:text-emerald-400" size={28} />
        <p className="text-sm text-slate-500 dark:text-slate-400">Média de despesas</p>
        <strong className="mt-2 block text-3xl text-slate-950 dark:text-white">
          {formatCurrencyBRL(mediaDespesas)}
        </strong>
      </article>
    </section>
  );
}
