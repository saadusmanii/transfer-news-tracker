import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { CheckCircle2, UserMinus } from "lucide-react";

interface TwitterProfileCardProps {
  profile: {
    id: string;
    handle: string;
    displayName: string;
    profileImage?: string | null;
    bio?: string | null;
    verified: boolean;
    _count?: {
      tweets: number;
    };
  };
  followId?: string;
  onUnfollow?: () => void;
  onFollow?: () => void;
  isFollowing?: boolean;
}

export default function TwitterProfileCard({
  profile,
  followId,
  onUnfollow,
  onFollow,
  isFollowing = false,
}: TwitterProfileCardProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
      <div className="flex items-start gap-4">
        <Avatar
          src={profile.profileImage}
          alt={profile.displayName}
          size="lg"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white truncate">
              {profile.displayName}
            </h3>
            {profile.verified && (
              <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
            )}
          </div>

          <p className="text-slate-400 text-sm mb-3">@{profile.handle}</p>

          {profile.bio && (
            <p className="text-slate-300 text-sm line-clamp-2 mb-4">
              {profile.bio}
            </p>
          )}

          {profile._count && (
            <Badge variant="neutral" className="mb-4">
              {profile._count.tweets} tweet{profile._count.tweets !== 1 ? "s" : ""}
            </Badge>
          )}

          {isFollowing ? (
            <Button
              variant="danger"
              size="sm"
              onClick={onUnfollow}
              className="w-full"
            >
              <UserMinus className="w-4 h-4 mr-2" />
              Unfollow
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onFollow}
              className="w-full"
            >
              Follow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
