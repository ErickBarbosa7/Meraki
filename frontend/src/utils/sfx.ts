let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType,
  gain: number,
  delay = 0
): void {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export function playTick(progress = 0): void {
  const freq = 200 + progress * 260 + Math.random() * 40;
  tone(freq, 0.07, "triangle", 0.06);
}

export function playLand(): void {
  tone(110, 0.28, "sine", 0.09);
  tone(261.63, 0.55, "triangle", 0.05, 0.02);
  tone(392, 0.45, "triangle", 0.032, 0.02);
  tone(783.99, 0.3, "sine", 0.02, 0.03);
}