import { Lottie } from "lottie-react";

interface LottieAnimationProps {
  data: object;
  className?: string;
}

export default function LottieAnimation({ data, className }: LottieAnimationProps) {
  return <Lottie src={data} loop autoplay aria-hidden className={className} />;
}