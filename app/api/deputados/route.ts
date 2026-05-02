import { NextResponse } from "next/server";
import { getDeputados } from "@/app/services/camaraApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const deputados = await getDeputados({
      siglaUf: searchParams.get("siglaUf") ?? undefined,
      siglaPartido: searchParams.get("siglaPartido") ?? undefined,
    });

    return NextResponse.json({ dados: deputados });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Não foi possível carregar os deputados.";

    return NextResponse.json({ erro: message, dados: [] }, { status: 500 });
  }
}
