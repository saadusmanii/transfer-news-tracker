"use client";

import AddProfileModal from "@/components/profiles/AddProfileModal";
import TwitterProfileCard from "@/components/profiles/TwitterProfileCard";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Search, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfilesPage() {
  const [followedProfiles, setFollowedProfiles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchFollowedProfiles();
  }, []);

  const fetchFollowedProfiles = async () => {
    try {
      const response = await fetch("/api/profiles");
      if (response.ok) {
        const data = await response.json();
        setFollowedProfiles(data);
      }
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (followId: string) => {
    try {
      const response = await fetch(`/api/profiles/${followId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFollowedProfiles(followedProfiles.filter((p) => p.id !== followId));
      }
    } catch (error) {
      console.error("Failed to unfollow:", error);
    }
  };

  const handleAddProfile = async (profile: any) => {
    try {
      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        fetchFollowedProfiles();
      }
    } catch (error) {
      console.error("Failed to add profile:", error);
    }
  };

  const filteredProfiles = followedProfiles.filter(
    (follow) =>
      follow.twitterProfile.displayName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      follow.twitterProfile.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Twitter Profiles</h1>
        <p className="text-slate-400">
          Manage the transfer news sources you follow
        </p>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search profiles..."
              className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <UserPlus className="w-5 h-5 mr-2" />
          Add Profile
        </Button>
      </div>

      {/* Followed profiles grid */}
      {filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((follow) => (
            <TwitterProfileCard
              key={follow.id}
              profile={follow.twitterProfile}
              followId={follow.id}
              onUnfollow={() => handleUnfollow(follow.id)}
              isFollowing={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-xl">
          <UserPlus className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">
            {searchQuery ? "No profiles found" : "No profiles yet"}
          </h3>
          <p className="text-slate-500 mb-6">
            {searchQuery
              ? "Try a different search term"
              : "Start following Twitter profiles to see transfer news"}
          </p>
          {!searchQuery && (
            <Button onClick={() => setShowAddModal(true)}>
              <UserPlus className="w-5 h-5 mr-2" />
              Add Your First Profile
            </Button>
          )}
        </div>
      )}

      {/* Add Profile Modal */}
      <AddProfileModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddProfile}
      />
    </div>
  );
}
