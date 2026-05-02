import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  lastUpdated: string;
};

export function Header({ lastUpdated }: HeaderProps) {
  return (
    <header className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Dados públicos e transparência
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white md:text-5xl">
            Transparência Cidadã
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
            Este painel tem como objetivo promover transparência e facilitar o acesso da população a dados públicos da Câmara dos Deputados, permitindo uma visualização clara e acessível das informações.
          </p>
        </div>

        <ThemeToggle />
      </div>

      <div className="mt-6 grid gap-3 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">
        <p>
          <span className="font-semibold text-slate-800 dark:text-slate-100">Fonte dos dados:</span>{" "}
          API da Câmara dos Deputados
        </p>
        <p className="md:text-right">
          <span className="font-semibold text-slate-800 dark:text-slate-100">
            Última atualização:
          </span>{" "}
          {lastUpdated}
        </p>
      </div>
    </header>
  );
}
