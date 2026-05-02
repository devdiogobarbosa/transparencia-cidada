"use client";

import { useMemo, useState } from "react";
import { ChartBar } from "@/app/components/dashboard/ChartBar";
import { ChartLine } from "@/app/components/dashboard/ChartLine";
import { MetricsCards } from "@/app/components/dashboard/MetricsCards";
import { DeputadosList } from "@/app/components/deputados/DeputadosList";
import { Filters, type FiltersState } from "@/app/components/filters/Filters";
import { Footer } from "@/app/components/layout/Footer";
import { Header } from "@/app/components/layout/Header";
import { EmptyState } from "@/app/components/ui/EmptyState";
import { ErrorState } from "@/app/components/ui/ErrorState";
import { LoadingState } from "@/app/components/ui/LoadingState";
import { useDeputados } from "@/app/hooks/useDeputados";
import { useDespesas } from "@/app/hooks/useDespesas";

const INITIAL_FILTERS: FiltersState = {
  busca: "",
  siglaUf: "",
  siglaPartido: "",
};

export default function Home() {
  const [filters, setFilters] = useState<FiltersState>(INITIAL_FILTERS);
  const lastUpdated = useMemo(() => new Date().toLocaleDateString("pt-BR"), []);

  const {
    deputadosFiltrados,
    partidosDisponiveis,
    isLoading: isLoadingDeputados,
    error: deputadosError,
  } = useDeputados(filters);

  const {
    despesasPorDeputado,
    despesasPorMes,
    totalDespesas,
    mediaDespesas,
    deputadosComDespesas,
    isLoading: isLoadingDespesas,
    error: despesasError,
  } = useDespesas(deputadosFiltrados);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header lastUpdated={lastUpdated} />

        <Filters
          filters={filters}
          partidos={partidosDisponiveis}
          onChange={setFilters}
        />

        {deputadosError ? (
          <ErrorState message={deputadosError} />
        ) : (
          <>
            <MetricsCards
              totalDeputados={deputadosFiltrados.length}
              totalDespesas={totalDespesas}
              mediaDespesas={mediaDespesas}
            />

            {isLoadingDeputados ? (
              <LoadingState message="Carregando deputados..." />
            ) : deputadosFiltrados.length === 0 ? (
              <EmptyState message="Nenhum dado encontrado para os filtros selecionados." />
            ) : (
              <>
                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
                        Visualização de despesas
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Para manter o painel estável, as despesas são consultadas para até 5 deputados exibidos.
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Deputados analisados: {deputadosComDespesas.length}
                    </p>
                  </div>

                  {isLoadingDespesas ? (
                    <LoadingState message="Carregando despesas..." />
                  ) : despesasError ? (
                    <ErrorState message={despesasError} />
                  ) : (
                    <div className="grid gap-6 xl:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                        <h3 className="mb-4 font-semibold text-slate-900 dark:text-slate-100">
                          Despesas totais por deputado
                        </h3>
                        <ChartBar data={despesasPorDeputado} />
                      </div>

                      <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                        <h3 className="mb-4 font-semibold text-slate-900 dark:text-slate-100">
                          Evolução mensal das despesas
                        </h3>
                        <ChartLine data={despesasPorMes} />
                      </div>
                    </div>
                  )}
                </section>

                <DeputadosList
                  deputados={deputadosFiltrados}
                  despesasPorDeputado={despesasPorDeputado}
                />
              </>
            )}
          </>
        )}

        <Footer />
      </div>
    </main>
  );
}
