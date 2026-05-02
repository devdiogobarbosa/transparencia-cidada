import type { Deputado, Despesa, DespesaPorDeputado, DespesaPorMes } from "./camaraApi";

export function safeNumber(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export function getValorDespesa(despesa: Despesa) {
  return safeNumber(despesa.valorLiquido ?? despesa.valorDocumento);
}

export function calcularTotalDespesas(despesas: Despesa[]) {
  return despesas.reduce((total, despesa) => total + getValorDespesa(despesa), 0);
}

export function calcularMediaDespesas(totais: DespesaPorDeputado[]) {
  if (totais.length === 0) {
    return 0;
  }

  return totais.reduce((total, item) => total + safeNumber(item.total), 0) / totais.length;
}

export function agruparDespesasPorMes(despesas: Despesa[]): DespesaPorMes[] {
  const grouped = despesas.reduce<Record<string, number>>((accumulator, despesa) => {
    const ano = despesa.ano;
    const mes = despesa.mes;

    if (!ano || !mes) {
      return accumulator;
    }

    const key = `${ano}-${String(mes).padStart(2, "0")}`;
    accumulator[key] = safeNumber(accumulator[key]) + getValorDespesa(despesa);
    return accumulator;
  }, {});

  return Object.entries(grouped)
    .map(([mes, total]) => ({ mes, total }))
    .sort((a, b) => a.mes.localeCompare(b.mes));
}

export function montarTotalPorDeputado(
  deputado: Deputado,
  despesas: Despesa[],
): DespesaPorDeputado {
  return {
    deputadoId: deputado.id,
    nome: deputado.nome ?? "Nome não informado",
    partido: deputado.siglaPartido ?? "-",
    uf: deputado.siglaUf ?? "-",
    total: calcularTotalDespesas(despesas),
  };
}

export function normalizarTexto(value: string | null | undefined) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
