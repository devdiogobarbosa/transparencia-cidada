import Image from "next/image";
import type { Deputado, DespesaPorDeputado } from "@/app/services/camaraApi";
import { formatCurrencyBRL } from "@/app/services/formatters";
import { EmptyState } from "@/app/components/ui/EmptyState";

type DeputadosListProps = {
  deputados: Deputado[];
  despesasPorDeputado: DespesaPorDeputado[];
};

export function DeputadosList({ deputados, despesasPorDeputado }: DeputadosListProps) {
  const despesasMap = new Map(
    despesasPorDeputado.map((item) => [item.deputadoId, item.total]),
  );

  if (deputados.length === 0) {
    return <EmptyState message="Nenhum dado encontrado para os filtros selecionados." />;
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Deputados</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Lista de parlamentares retornados pelos filtros aplicados.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {deputados.map((deputado) => (
          <article
            key={deputado.id}
            className="flex gap-4 rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:hover:border-emerald-700"
          >
            <Image
              src={deputado.urlFoto || "/deputado-placeholder.svg"}
              alt={`Foto de ${deputado.nome}`}
              width={80}
              height={80}
              className="h-20 w-20 rounded-2xl bg-slate-100 object-cover dark:bg-slate-800"
            />
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-slate-950 dark:text-white">
                {deputado.nome ?? "Nome não informado"}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {deputado.siglaPartido ?? "-"} • {deputado.siglaUf ?? "-"}
              </p>
              <p className="mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Despesas: {formatCurrencyBRL(despesasMap.get(deputado.id))}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
