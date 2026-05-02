"use client";

import { useEffect, useMemo, useState } from "react";
import type { Deputado } from "@/app/services/camaraApi";
import { normalizarTexto } from "@/app/services/dataUtils";

type UseDeputadosFilters = {
  siglaUf: string;
  siglaPartido: string;
  busca: string;
};

type ApiResponse = {
  dados?: Deputado[];
  erro?: string;
};

export function useDeputados(filters: UseDeputadosFilters) {
  const [deputados, setDeputados] = useState<Deputado[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDeputados() {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters.siglaUf) params.set("siglaUf", filters.siglaUf);
      if (filters.siglaPartido) params.set("siglaPartido", filters.siglaPartido);

      try {
        const response = await fetch(`/api/deputados?${params.toString()}`, {
          signal: controller.signal,
        });
        const json = (await response.json()) as ApiResponse;

        if (!response.ok) {
          throw new Error(json.erro ?? "Não foi possível carregar os deputados.");
        }

        setDeputados(Array.isArray(json.dados) ? json.dados : []);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        setError(err instanceof Error ? err.message : "Erro inesperado ao carregar dados.");
        setDeputados([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadDeputados();

    return () => controller.abort();
  }, [filters.siglaPartido, filters.siglaUf]);

  const deputadosFiltrados = useMemo(() => {
    const busca = normalizarTexto(filters.busca);

    if (!busca) {
      return deputados;
    }

    return deputados.filter((deputado) => normalizarTexto(deputado.nome).includes(busca));
  }, [filters.busca, deputados]);

  const partidosDisponiveis = useMemo(() => {
    const partidos = new Set(deputados.map((deputado) => deputado.siglaPartido).filter(Boolean));

    if (filters.siglaPartido) {
      partidos.add(filters.siglaPartido);
    }

    return Array.from(partidos).sort();
  }, [deputados, filters.siglaPartido]);

  return {
    deputados,
    deputadosFiltrados,
    partidosDisponiveis,
    isLoading,
    error,
  };
}
