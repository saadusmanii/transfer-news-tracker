import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE - Unfollow a Twitter profile
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.twitterProfileFollow.delete({
      where: {
        id: params.id,
        userId: (session.user as any).id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error unfollowing profile:", error);
    return NextResponse.json(
      { error: "Failed to unfollow profile" },
      { status: 500 }
    );
  }
}
