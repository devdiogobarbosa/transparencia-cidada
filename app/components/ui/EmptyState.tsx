import { Inbox } from "lucide-react";

type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
      <div>
        <Inbox className="mx-auto mb-3" size={28} />
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
