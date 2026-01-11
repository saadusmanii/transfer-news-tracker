"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Save, Check } from "lucide-react";

export default function SettingsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [preferences, setPreferences] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teamsRes, prefsRes] = await Promise.all([
        fetch("/api/teams"),
        fetch("/api/preferences"),
      ]);

      if (teamsRes.ok) {
        const teamsData = await teamsRes.json();
        setTeams(teamsData);
      }

      if (prefsRes.ok) {
        const prefsData = await prefsRes.json();
        setPreferences(prefsData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      const response = await fetch("/api/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favoriteTeamId: preferences.favoriteTeamId,
          notificationsEnabled: preferences.notificationsEnabled,
          emailNotifications: preferences.emailNotifications,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save preferences:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your preferences and account settings</p>
      </div>

      <div className="space-y-6">
        {/* Favorite Team */}
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Favorite Team</h2>
          <p className="text-slate-400 text-sm mb-4">
            Select your favorite team to prioritize their transfer news
          </p>
          <select
            value={preferences?.favoriteTeamId || ""}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                favoriteTeamId: e.target.value ? parseInt(e.target.value) : null,
              })
            }
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">No favorite team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </Card>

        {/* Notifications */}
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-white font-medium">Enable Notifications</p>
                <p className="text-slate-400 text-sm">
                  Get notified about new transfer news
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences?.notificationsEnabled || false}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    notificationsEnabled: e.target.checked,
                  })
                }
                className="w-5 h-5 accent-blue-600"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-slate-400 text-sm">
                  Receive transfer news updates via email
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences?.emailNotifications || false}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    emailNotifications: e.target.checked,
                  })
                }
                className="w-5 h-5 accent-blue-600"
              />
            </label>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} isLoading={saving} disabled={saved}>
            {saved ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
