import Image from "next/image";

interface TeamLogoProps {
  name: string;
  logoUrl?: string | null;
  size?: "sm" | "md" | "lg";
}

export default function TeamLogo({ name, logoUrl, size = "md" }: TeamLogoProps) {
  const sizes = {
    sm: "w-6 h-6 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
  };

  if (!logoUrl) {
    return (
      <div
        className={`${sizes[size]} rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold flex-shrink-0`}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <div className={`${sizes[size]} relative flex-shrink-0`}>
      <Image
        src={logoUrl}
        alt={`${name} logo`}
        fill
        className="object-contain"
      />
    </div>
  );
}
