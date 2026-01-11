"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Users, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

export default function DashboardPage() {
  const [followedProfiles, setFollowedProfiles] = useState<any[]>([]);
  const [tweets, setTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profilesRes, tweetsRes] = await Promise.all([
        fetch("/api/profiles"),
        fetch("/api/tweets?limit=20"),
      ]);

      if (profilesRes.ok) {
        const profilesData = await profilesRes.json();
        setFollowedProfiles(profilesData);
      }

      if (tweetsRes.ok) {
        const tweetsData = await tweetsRes.json();
        setTweets(tweetsData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Show welcome message if no profiles followed
  if (followedProfiles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to Transfer News Tracker!
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Get started by following Twitter profiles of transfer news experts like Fabrizio Romano,
            David Ornstein, and more to see their latest updates here.
          </p>
          <Link href="/dashboard/profiles">
            <Button size="lg">
              <Users className="w-5 h-5 mr-2" />
              Follow Profiles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Transfer News Feed</h1>
          <p className="text-slate-400">
            Latest updates from {followedProfiles.length} profile{followedProfiles.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button variant="secondary" onClick={fetchData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Followed Profiles</p>
              <p className="text-3xl font-bold text-white mt-1">{followedProfiles.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Tweets</p>
              <p className="text-3xl font-bold text-white mt-1">{tweets.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card hover>
          <Link href="/dashboard/profiles" className="block">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Manage Profiles</p>
                <p className="text-sm font-medium text-blue-400 mt-1">Add or remove →</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </Link>
        </Card>
      </div>

      {/* Tweet Feed */}
      {tweets.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Recent Updates</h2>
          {/* Tweet cards will be rendered here once we create the TweetCard component */}
          <Card>
            <p className="text-slate-400 text-center py-8">
              Tweet feed coming soon! Building tweet components next...
            </p>
          </Card>
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">
              No tweets yet. Tweets from your followed profiles will appear here.
            </p>
            <Link href="/dashboard/profiles">
              <Button variant="secondary">Follow More Profiles</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
