"use client";

import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Search } from "lucide-react";

interface AddProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (profile: any) => void;
}

export default function AddProfileModal({
  isOpen,
  onClose,
  onAdd,
}: AddProfileModalProps) {
  const [handle, setHandle] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, you'd search Twitter API here
      // For now, just create a basic profile
      const profile = {
        handle: handle.replace("@", ""),
        displayName: displayName || handle,
        profileImage: null,
        bio: null,
        verified: false,
      };

      await onAdd(profile);
      setHandle("");
      setDisplayName("");
      onClose();
    } catch (error) {
      console.error("Error adding profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Twitter Profile">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-slate-400 mb-4">
          Add a Twitter profile to follow their transfer news updates.
        </p>

        <Input
          label="Twitter Handle"
          placeholder="@FabrizioRomano"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          required
        />

        <Input
          label="Display Name (Optional)"
          placeholder="Fabrizio Romano"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-400 text-sm">
            <strong>Note:</strong> Once you add your Twitter API keys, this will automatically
            fetch profile information from Twitter.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={loading} className="flex-1">
            <Search className="w-4 h-4 mr-2" />
            Add Profile
          </Button>
        </div>
      </form>
    </Modal>
  );
}
