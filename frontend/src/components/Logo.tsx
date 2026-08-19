export default function Logo() {
  return (
    <header className="text-center">
      <h1 className="font-display text-logo font-semibold tracking-logo text-oli-primary max-md:text-[2.5rem] md:text-[3rem] xl:text-[3.5rem]">
        MERAKI<span className="text-oli-accent">.</span>
      </h1>
      <p className="mt-3 text-tagline font-normal uppercase tracking-ui text-oli-muted">
        Discover something new.
      </p>
      <div
        aria-hidden
        className="mx-auto mt-4 h-px w-full max-w-[11rem] bg-gradient-to-r from-transparent via-oli-muted/50 to-transparent"
      />
    </header>
  );
}