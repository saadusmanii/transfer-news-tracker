import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Get all followed profiles for user
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const followedProfiles = await prisma.twitterProfileFollow.findMany({
      where: { userId: (session.user as any).id },
      include: {
        twitterProfile: {
          include: {
            _count: {
              select: { tweets: true },
            },
          },
        },
      },
      orderBy: { followedAt: "desc" },
    });

    return NextResponse.json(followedProfiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}

// POST - Follow a new Twitter profile
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { handle, displayName, profileImage, bio, verified } = await request.json();

    if (!handle || !displayName) {
      return NextResponse.json(
        { error: "Handle and display name are required" },
        { status: 400 }
      );
    }

    // Check if profile exists, create if not
    const profile = await prisma.twitterProfile.upsert({
      where: { handle },
      update: { displayName, profileImage, bio, verified },
      create: { handle, displayName, profileImage, bio, verified },
    });

    // Check if already following
    const existingFollow = await prisma.twitterProfileFollow.findUnique({
      where: {
        userId_twitterProfileId: {
          userId: (session.user as any).id,
          twitterProfileId: profile.id,
        },
      },
    });

    if (existingFollow) {
      return NextResponse.json(
        { error: "Already following this profile" },
        { status: 400 }
      );
    }

    // Create follow relationship
    const follow = await prisma.twitterProfileFollow.create({
      data: {
        userId: (session.user as any).id,
        twitterProfileId: profile.id,
      },
      include: {
        twitterProfile: true,
      },
    });

    return NextResponse.json(follow, { status: 201 });
  } catch (error) {
    console.error("Error following profile:", error);
    return NextResponse.json(
      { error: "Failed to follow profile" },
      { status: 500 }
    );
  }
}
