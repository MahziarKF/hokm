import { Reem_Kufi } from "next/font/google";

const reemKufi = Reem_Kufi({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

interface ReemKufiTextProps {
  children: React.ReactNode;
  className?: string;
}

const ReemKufiText: React.FC<ReemKufiTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`${reemKufi.className} ${className}`}>{children}</span>
  );
};

export default ReemKufiText;
