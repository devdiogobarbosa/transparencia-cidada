export function formatCurrencyBRL(value: number | null | undefined) {
  const amount = typeof value === "number" && Number.isFinite(value) ? value : 0;

  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatIntegerBR(value: number | null | undefined) {
  const amount = typeof value === "number" && Number.isFinite(value) ? value : 0;
  return amount.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
}
