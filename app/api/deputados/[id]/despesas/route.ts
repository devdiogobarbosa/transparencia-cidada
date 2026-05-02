import { NextResponse } from "next/server";
import { getDespesasDeputado } from "@/app/services/camaraApi";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const despesas = await getDespesasDeputado(id);
    return NextResponse.json({ dados: despesas });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Não foi possível carregar as despesas.";

    return NextResponse.json({ erro: message, dados: [] }, { status: 500 });
  }
}
