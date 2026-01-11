import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Get user's followed profiles
    const followedProfiles = await prisma.twitterProfileFollow.findMany({
      where: { userId: (session.user as any).id },
      select: { twitterProfileId: true },
    });

    const profileIds = followedProfiles.map((f) => f.twitterProfileId);

    if (profileIds.length === 0) {
      return NextResponse.json([]);
    }

    // Get tweets from followed profiles
    const tweets = await prisma.tweet.findMany({
      where: {
        twitterProfileId: { in: profileIds },
        ...(teamId && { teamId: parseInt(teamId) }),
      },
      include: {
        twitterProfile: true,
        team: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    return NextResponse.json(tweets);
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tweets" },
      { status: 500 }
    );
  }
}
