import { LinearGradient } from "react-text-gradients";
import ReemKufiText from "./reemKufi";

export default function GradientHokm({
  children,
  className,
}: {
  children: Readonly<React.ReactNode>;
  className: string;
}) {
  return (
    <ReemKufiText className={className}>
      <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
        حکم
      </LinearGradient>
    </ReemKufiText>
  );
}
