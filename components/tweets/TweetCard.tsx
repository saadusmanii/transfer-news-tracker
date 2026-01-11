import { Heart, Repeat2, ExternalLink, CheckCircle2 } from "lucide-react";
import TeamBadge from "../teams/TeamBadge";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";
import { formatDistanceToNow } from "date-fns";

interface TweetCardProps {
  tweet: {
    id: number;
    content: string;
    author: string;
    sentiment: string;
    tweetUrl?: string | null;
    likes: number;
    retweets: number;
    createdAt: Date | string;
    twitterProfile?: {
      handle: string;
      displayName: string;
      profileImage?: string | null;
      verified: boolean;
    } | null;
    team?: {
      id: number;
      name: string;
      logoUrl?: string | null;
    } | null;
  };
}

export default function TweetCard({ tweet }: TweetCardProps) {
  const getSentimentVariant = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "positive";
      case "negative":
        return "negative";
      default:
        return "neutral";
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar
            src={tweet.twitterProfile?.profileImage}
            alt={tweet.twitterProfile?.displayName || tweet.author}
            size="md"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white truncate">
                {tweet.twitterProfile?.displayName || tweet.author}
              </h3>
              {tweet.twitterProfile?.verified && (
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>@{tweet.twitterProfile?.handle || "unknown"}</span>
              <span>•</span>
              <span>
                {formatDistanceToNow(new Date(tweet.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </div>

        {tweet.team && (
          <TeamBadge name={tweet.team.name} logoUrl={tweet.team.logoUrl} />
        )}
      </div>

      {/* Content */}
      <p className="text-white text-base leading-relaxed mb-4 whitespace-pre-wrap">
        {tweet.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <div className="flex items-center gap-6 text-slate-400">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            <span className="text-sm">{tweet.likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Repeat2 className="w-5 h-5" />
            <span className="text-sm">{tweet.retweets.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={getSentimentVariant(tweet.sentiment)}>
            {tweet.sentiment}
          </Badge>
          {tweet.tweetUrl && (
            <a
              href={tweet.tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
