'use client';

import { useState, useEffect } from "react";
import TeamLogo from "./teams/TeamLogo";
import LoadingSpinner from "./ui/LoadingSpinner";

interface Team {
  id: number;
  name: string;
  logoUrl?: string | null;
}

interface TeamSelectorProps {
  value?: number | null;
  onChange?: (teamId: number | null) => void;
  label?: string;
  placeholder?: string;
}

export default function TeamSelector({
  value,
  onChange,
  label = "Select your team",
  placeholder = "Choose a team"
}: TeamSelectorProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(value || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedTeam(value);
    }
  }, [value]);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/teams");
      if (response.ok) {
        const data = await response.json();
        setTeams(data);
      }
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const teamId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedTeam(teamId);
    if (onChange) {
      onChange(teamId);
    }
  };

  const selectedTeamData = teams.find(t => t.id === selectedTeam);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <label htmlFor="team" className="text-lg font-medium text-white">
        {label}
      </label>

      <select
        id="team"
        value={selectedTeam || ""}
        onChange={handleChange}
        className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <option value="">{placeholder}</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>

      {selectedTeamData && (
        <div className="flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
          <TeamLogo name={selectedTeamData.name} logoUrl={selectedTeamData.logoUrl} size="md" />
          <p className="text-white">
            You selected: <span className="font-semibold">{selectedTeamData.name}</span>
          </p>
        </div>
      )}
    </div>
  );
}