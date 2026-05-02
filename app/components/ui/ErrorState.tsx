import { AlertCircle } from "lucide-react";

type ErrorStateProps = {
  message: string;
};

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-red-800 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 shrink-0" size={20} />
        <div>
          <p className="font-semibold">Não foi possível carregar estes dados.</p>
          <p className="mt-1 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
