import React, { useState } from "react";
import { useData } from "../../auth/DataContext";
import { Pencil, Trash2, X, Check, Plus, Search, UserPlus } from "lucide-react";

function Users() {
  const { users, deleteUser, updateUser, addUser } = useData();
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // New User State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("user");

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      deleteUser(id);
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditName(user.name);
  };

  const saveEdit = (id) => {
    updateUser(id, { name: editName });
    setEditingId(null);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPassword)
      return alert("Please fill in all fields");

    addUser({
      name: newName,
      email: newEmail,
      password: newPassword,
      role: newRole,
    });

    alert("User created successfully!");
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewRole("user");
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            User Management
          </h2>
          <p className="text-sm text-gray-500">
            Manage access and account details
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition w-full sm:w-auto justify-center"
        >
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 animate-in fade-in slide-in-from-top-4">
          <h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create New Account
          </h3>
          <form
            onSubmit={handleAddUser}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
          >
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-indigo-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 shadow-sm py-2.5 px-4 text-sm"
                placeholder="John Doe"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-indigo-900 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 shadow-sm py-2.5 px-4 text-sm"
                placeholder="john@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-indigo-900 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 shadow-sm py-2.5 px-4 text-sm"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-indigo-900 mb-2">
                Role
              </label>
              <select
                className="w-full border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 shadow-sm py-2.5 px-4 text-sm"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="md:col-span-2 lg:col-span-4 flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 px-4 py-2 text-sm font-medium hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id || user.email}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                          {user.avatar || user.name?.[0]}
                        </div>
                        <div>
                          {editingId === user.id ? (
                            <input
                              type="text"
                              className="border rounded px-2 py-1 text-sm"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              autoFocus
                            />
                          ) : (
                            <p className="font-medium text-gray-900">
                              {user.name}
                            </p>
                          )}
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-50 text-purple-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        Active
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {editingId === user.id ? (
                          <>
                            <button
                              onClick={() => saveEdit(user.id)}
                              className="text-green-600 p-1"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-gray-500 p-1"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEdit(user)}
                            className="text-indigo-600 p-1"
                          >
                            <Pencil size={16} />
                          </button>
                        )}

                        <button
                          onClick={() => handleRemove(user.id)}
                          title="Remove User"
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
