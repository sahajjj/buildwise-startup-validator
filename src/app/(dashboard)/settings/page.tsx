"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Users, Check, AlertCircle, Plus } from "lucide-react";

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("Alex's Workspace");
  const [savedName, setSavedName] = useState(false);
  
  // Invites state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("EDITOR");
  const [members, setMembers] = useState([
    { email: "founder@buildwise.ai", role: "OWNER" },
    { email: "advisor@buildwise.ai", role: "VIEWER" },
  ]);
  const [invited, setInvited] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedName(true);
    setTimeout(() => setSavedName(false), 2000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setMembers(prev => [...prev, { email: inviteEmail, role: inviteRole }]);
    setInviteEmail("");
    setInvited(true);
    setTimeout(() => setInvited(false), 2500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-navy-900">
          Settings & Collaboration
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage workspace settings, preferences, and invite collaborators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: General Settings */}
        <div className="md:col-span-2 space-y-6">
          {/* Workspace info */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
              <SettingsIcon className="h-4.5 w-4.5 text-purple-600" />
              Workspace Identity
            </h3>

            <form onSubmit={handleSaveName} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Workspace Name</label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={e => setWorkspaceName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all bg-white"
                />
              </div>

              <div className="flex items-center gap-3 justify-end">
                {savedName && (
                  <span className="text-xs text-success font-semibold flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" />
                    Saved!
                  </span>
                )}
                <button type="submit" className="btn-gold !text-xs !py-2.5">
                  Update Name
                </button>
              </div>
            </form>
          </div>

          {/* Members invite panel */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
              <Users className="h-4.5 w-4.5 text-purple-600" />
              Invite Teammates
            </h3>

            <form onSubmit={handleSendInvite} className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Teammate Email</label>
                <input
                  type="email"
                  placeholder="co-founder@startup.com"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all bg-white"
                />
              </div>

              <div className="w-full sm:w-36 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Access Role</label>
                <select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all bg-white"
                >
                  <option value="EDITOR">Editor</option>
                  <option value="VIEWER">Viewer</option>
                </select>
              </div>

              <button type="submit" className="btn-gold !text-xs !py-2.5 shrink-0 w-full sm:w-auto justify-center">
                Send Invite
                <span className="btn-icon"><Plus className="h-3.5 w-3.5" /></span>
              </button>
            </form>

            {invited && (
              <div className="p-3 rounded-xl bg-success/5 border border-success/20 text-success text-xs flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0" />
                <span>Invite successfully sent to collaborator!</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Members List */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4 h-fit">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            Workspace Members
          </h3>

          <div className="divide-y divide-gray-50">
            {members.map((member) => (
              <div key={member.email} className="py-3 flex items-center justify-between">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-navy-900 truncate">{member.email}</div>
                  <span className="text-[9px] text-gray-400 font-semibold">{member.email === "founder@buildwise.ai" ? "Active" : "Pending"}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-purple-50 text-[9px] font-bold text-purple-600 uppercase">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
