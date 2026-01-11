interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "positive" | "negative" | "neutral";
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-blue-400/10 border-blue-400/30 text-blue-400",
    positive: "bg-green-400/10 border-green-400/30 text-green-400",
    negative: "bg-red-400/10 border-red-400/30 text-red-400",
    neutral: "bg-slate-400/10 border-slate-400/30 text-slate-400",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
