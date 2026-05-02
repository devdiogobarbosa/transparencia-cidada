"use client";

import { Search } from "lucide-react";

const UFS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export type FiltersState = {
  busca: string;
  siglaUf: string;
  siglaPartido: string;
};

type FiltersProps = {
  filters: FiltersState;
  partidos: string[];
  onChange: (filters: FiltersState) => void;
};

export function Filters({ filters, partidos, onChange }: FiltersProps) {
  function updateFilter(key: keyof FiltersState, value: string) {
    onChange({
      ...filters,
      [key]: value,
    });
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Filtros</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Refine os dados por nome, estado e partido. Os resultados são atualizados automaticamente.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Buscar por nome
          </span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="search"
              value={filters.busca}
              onChange={(event) => updateFilter("busca", event.target.value)}
              placeholder="Digite o nome do deputado"
              className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Estado
          </span>
          <select
            value={filters.siglaUf}
            onChange={(event) => updateFilter("siglaUf", event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="">Todos os estados</option>
            {UFS.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Partido
          </span>
          <select
            value={filters.siglaPartido}
            onChange={(event) => updateFilter("siglaPartido", event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="">Todos os partidos</option>
            {partidos.map((partido) => (
              <option key={partido} value={partido}>
                {partido}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
