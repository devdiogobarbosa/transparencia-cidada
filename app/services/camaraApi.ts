const CAMARA_API_BASE_URL = "https://dadosabertos.camara.leg.br/api/v2";

export type CamaraListResponse<T> = {
  dados?: T[] | null;
  links?: Array<{
    rel: string;
    href: string;
  }>;
};

export type Deputado = {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  uriPartido?: string;
  siglaUf: string;
  idLegislatura?: number;
  urlFoto?: string | null;
  email?: string | null;
};

export type Despesa = {
  ano?: number | null;
  mes?: number | null;
  tipoDespesa?: string | null;
  dataDocumento?: string | null;
  valorDocumento?: number | null;
  valorLiquido?: number | null;
  nomeFornecedor?: string | null;
};

export type DespesaPorDeputado = {
  deputadoId: number;
  nome: string;
  partido: string;
  uf: string;
  total: number;
};

export type DespesaPorMes = {
  mes: string;
  total: number;
};

function buildCamaraUrl(path: string, params?: Record<string, string | number | undefined>) {
  const url = new URL(`${CAMARA_API_BASE_URL}${path}`);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
}

async function fetchCamaraDados<T>(
  path: string,
  params?: Record<string, string | number | undefined>,
): Promise<T[]> {
  const response = await fetch(buildCamaraUrl(path, params), {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 900,
    },
  });

  if (!response.ok) {
    throw new Error("Não foi possível carregar os dados da Câmara dos Deputados.");
  }

  const json = (await response.json()) as CamaraListResponse<T>;
  return Array.isArray(json.dados) ? json.dados : [];
}

export function getDeputados(params?: {
  siglaUf?: string;
  siglaPartido?: string;
}) {
  return fetchCamaraDados<Deputado>("/deputados", {
    siglaUf: params?.siglaUf,
    siglaPartido: params?.siglaPartido,
    itens: 100,
    ordem: "ASC",
    ordenarPor: "nome",
  });
}

export function getDespesasDeputado(id: string | number) {
  const currentYear = new Date().getFullYear();

  return fetchCamaraDados<Despesa>(`/deputados/${id}/despesas`, {
    ano: currentYear,
    itens: 100,
    ordem: "ASC",
    ordenarPor: "mes",
  });
}
