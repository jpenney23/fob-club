import { SlotStatus } from '@/lib/data/schedule';

const config: Record<SlotStatus, { label: string; className: string }> = {
  open:      { label: 'Open',      className: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' },
  pending:   { label: 'Pending',   className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' },
  confirmed: { label: 'Confirmed', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' },
  locked:    { label: 'Locked',    className: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' },
};

export default function StatusBadge({ status }: { status: SlotStatus }) {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
