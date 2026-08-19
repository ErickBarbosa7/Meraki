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
      className="rounded-full border border-meraki-primary/80 px-10 py-3 text-xs font-medium uppercase tracking-widest text-meraki-primary outline-none transition-all duration-300 ease-in-out hover:bg-meraki-primary hover:text-meraki-bg focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-meraki-primary disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}