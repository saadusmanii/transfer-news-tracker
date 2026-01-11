import TweetCard from "./TweetCard";
import LoadingSpinner from "../ui/LoadingSpinner";
import Button from "../ui/Button";
import { RefreshCw } from "lucide-react";

interface TweetFeedProps {
  tweets: any[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export default function TweetFeed({
  tweets,
  loading = false,
  onLoadMore,
  hasMore = false,
}: TweetFeedProps) {
  if (loading && tweets.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (tweets.length === 0) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
        <p className="text-slate-400 text-lg">No tweets yet</p>
        <p className="text-slate-500 text-sm mt-2">
          Tweets from your followed profiles will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}

      {hasMore && onLoadMore && (
        <div className="flex justify-center pt-4">
          <Button variant="secondary" onClick={onLoadMore} isLoading={loading}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
