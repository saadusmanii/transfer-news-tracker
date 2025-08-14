'use client';

import { useState } from "react";


const teams = [
    'AC Milan',
    'Ajax',
    'Arsenal',
    'AS Monaco',
    'Aston Villa',
    'Athletico Madrid',
    'Barcelona',
    'Bayern Munich',
    'Besiktas',
    'Borussia Dortmund',
    'Chelsea',
    'Fenerbache',
    'Galatasaray',
    'Inter Milan',
    'Juventus',
    'Lille',
    'Liverpool',
    'Manchester City',
    'Manchester United',
    'Napoli',
    'Newcastle',
    'PSG',
    'RB Leipzig',
    'Real Madrid',
    'Roma',
    'Tottenham Hotspur',

];

export default function TeamSelector(){
    const[selectedTeam, setSelectedTeam]= useState('');
    
    return(
        <div className="flex flex-col items-start gap-4 p-4">
      <label htmlFor="team" className="text-lg font-medium">
        Select your team:
      </label>

      <select
        id="team"
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-60"
      >
        <option value="">-- Choose a team --</option>
        {teams.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>

      {selectedTeam && (
        <p className="text-gray-700 text-md">
          You selected: <span className="font-semibold">{selectedTeam}</span>
        </p>
      )}
    </div>
  );
}