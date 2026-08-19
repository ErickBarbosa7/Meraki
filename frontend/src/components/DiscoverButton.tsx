interface DiscoverButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function DiscoverButton({ label, disabled, onClick }: DiscoverButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group rounded-full bg-oli-accent px-10 py-3 text-ui font-semibold uppercase tracking-ui text-oli-dark outline-none transition-all duration-300 ease-in-out hover:brightness-110 hover:scale-[1.03] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-oli-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 disabled:hover:scale-100"
    >
      {label}
      <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
    </button>
  );
}