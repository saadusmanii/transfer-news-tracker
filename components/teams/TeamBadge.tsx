import TeamLogo from "./TeamLogo";

interface TeamBadgeProps {
  name: string;
  logoUrl?: string | null;
}

export default function TeamBadge({ name, logoUrl }: TeamBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5">
      <TeamLogo name={name} logoUrl={logoUrl} size="sm" />
      <span className="text-sm font-medium text-white">{name}</span>
    </div>
  );
}
