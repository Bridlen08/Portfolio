import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { LayoutDashboard, MessageSquare, Briefcase, Plus, Trash2, Edit3, LogOut, X, Save } from "lucide-react";

interface AdminProps {
  token: string;
  onLogout: () => void;
}

export default function AdminDashboard({ token, onLogout }: AdminProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "messages">("messages");
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === "projects" ? "/api/projects" : "/api/contacts";
      const response = await fetch(`http://localhost:5003${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (activeTab === "projects") setProjects(data);
      else setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await fetch(`http://localhost:5003/api/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProject.id ? "PUT" : "POST";
    const endpoint = editingProject.id ? `/api/projects/${editingProject.id}` : "/api/projects";

    try {
      await fetch(`http://localhost:5003${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingProject),
      });
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`http://localhost:5003/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card/40 backdrop-blur-xl border-r border-border/50 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "messages" ? "bg-purple-500/10 text-purple-500 border border-purple-500/20" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "projects" ? "bg-purple-500/10 text-purple-500 border border-purple-500/20" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Projects
          </button>
        </nav>

        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all mt-auto"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>
            <p className="text-muted-foreground">Manage your portfolio {activeTab}</p>
          </div>
          {activeTab === "projects" && (
            <button
              onClick={() => {
                setEditingProject({ title: "", description: "", image: "", tech_stack: [], github_url: "", live_url: "" });
                setIsModalOpen(true);
              }}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Project
            </button>
          )}
        </header>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {activeTab === "messages" ? (
              messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{msg.name}</h4>
                      <p className="text-sm text-muted-foreground">{msg.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleDeleteContact(msg.id)}
                        className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-foreground/80 whitespace-pre-wrap">{msg.message}</p>
                </motion.div>
              ))
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <motion.div
                    key={proj.id}
                    className="bg-card/40 backdrop-blur-md rounded-2xl border border-border/50 overflow-hidden group"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setIsModalOpen(true);
                          }}
                          className="bg-white text-black p-3 rounded-full hover:scale-110 transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="bg-white text-red-500 p-3 rounded-full hover:scale-110 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-lg mb-1">{proj.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{proj.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            {((activeTab === "messages" && messages.length === 0) || (activeTab === "projects" && projects.length === 0)) && (
              <div className="text-center py-20 text-muted-foreground">No items found</div>
            )}
          </div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-card p-8 rounded-3xl border border-border/50 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">{editingProject.id ? "Edit Project" : "Add Project"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                      required
                      type="text"
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Image URL</label>
                    <input
                      required
                      type="text"
                      value={editingProject.image}
                      onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GitHub URL</label>
                    <input
                      type="text"
                      value={editingProject.github_url}
                      onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Live Demo URL</label>
                    <input
                      type="text"
                      value={editingProject.live_url}
                      onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(editingProject.tech_stack) ? editingProject.tech_stack.join(", ") : editingProject.tech_stack}
                    onChange={(e) => setEditingProject({ ...editingProject, tech_stack: e.target.value.split(",").map((s: string) => s.trim()) })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="React, Node.js, MySQL"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl py-4 font-bold shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Project
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
