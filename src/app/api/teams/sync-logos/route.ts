import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Sync team logos from TheSportsDB
export async function POST() {
  try {
    const teams = await prisma.team.findMany();
    let updated = 0;

    for (const team of teams) {
      try {
        // Search for team on TheSportsDB
        const response = await fetch(
          `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_API_KEY || "3"}/searchteams.php?t=${encodeURIComponent(team.name)}`
        );
        const data = await response.json();

        if (data.teams && data.teams[0]) {
          const teamData = data.teams[0];
          await prisma.team.update({
            where: { id: team.id },
            data: {
              logoUrl: teamData.strBadge || teamData.strTeamBadge,
              league: teamData.strLeague,
              country: teamData.strCountry,
              externalApiId: teamData.idTeam,
            },
          });
          updated++;
        }

        // Rate limit: wait 100ms between requests to be respectful
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to sync logo for ${team.name}:`, error);
      }
    }

    const updatedTeams = await prisma.team.findMany();

    return NextResponse.json({
      message: `Successfully synced ${updated} out of ${teams.length} teams`,
      teams: updatedTeams,
    });
  } catch (error) {
    console.error("Error syncing logos:", error);
    return NextResponse.json(
      { error: "Failed to sync team logos" },
      { status: 500 }
    );
  }
}
