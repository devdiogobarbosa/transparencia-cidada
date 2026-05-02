"use client";

import { useEffect, useMemo, useState } from "react";
import type { Deputado, Despesa, DespesaPorDeputado, DespesaPorMes } from "@/app/services/camaraApi";
import {
  agruparDespesasPorMes,
  calcularMediaDespesas,
  calcularTotalDespesas,
  montarTotalPorDeputado,
} from "@/app/services/dataUtils";

type ApiResponse = {
  dados?: Despesa[];
  erro?: string;
};

type DespesasState = {
  despesasPorDeputado: DespesaPorDeputado[];
  despesasPorMes: DespesaPorMes[];
  totalDespesas: number;
  mediaDespesas: number;
};

const EMPTY_STATE: DespesasState = {
  despesasPorDeputado: [],
  despesasPorMes: [],
  totalDespesas: 0,
  mediaDespesas: 0,
};

export function useDespesas(deputados: Deputado[]) {
  const deputadosLimitados = useMemo(() => deputados.slice(0, 5), [deputados]);
  const deputadosIds = deputadosLimitados.map((deputado) => deputado.id).join(",");

  const [state, setState] = useState<DespesasState>(EMPTY_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDespesas() {
      if (deputadosLimitados.length === 0) {
        setState(EMPTY_STATE);
        setError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          deputadosLimitados.map(async (deputado) => {
            const response = await fetch(`/api/deputados/${deputado.id}/despesas`, {
              signal: controller.signal,
            });
            const json = (await response.json()) as ApiResponse;

            if (!response.ok) {
              throw new Error(json.erro ?? "Não foi possível carregar as despesas.");
            }

            return {
              deputado,
              despesas: Array.isArray(json.dados) ? json.dados : [],
            };
          }),
        );

        const todasDespesas = results.flatMap((result) => result.despesas);
        const despesasPorDeputado = results.map((result) =>
          montarTotalPorDeputado(result.deputado, result.despesas),
        );

        setState({
          despesasPorDeputado,
          despesasPorMes: agruparDespesasPorMes(todasDespesas),
          totalDespesas: calcularTotalDespesas(todasDespesas),
          mediaDespesas: calcularMediaDespesas(despesasPorDeputado),
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        setError(err instanceof Error ? err.message : "Erro inesperado ao carregar despesas.");
        setState(EMPTY_STATE);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadDespesas();

    return () => controller.abort();
  }, [deputadosIds, deputadosLimitados]);

  return {
    ...state,
    deputadosComDespesas: deputadosLimitados,
    isLoading,
    error,
  };
}
