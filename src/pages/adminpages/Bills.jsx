import React, { useState } from 'react';
import { useData } from '../../auth/DataContext';
import { Plus, Search } from 'lucide-react';

function Bills() {
  const { bills, users, createBill } = useData();
  const [selectedUser, setSelectedUser] = useState('');
  const [amount, setAmount] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Filter out admins from the dropdown usually, but for now just show all
  const clientUsers = users ? users.filter(u => u.role === 'user') : [];

  const handleCreateBill = (e) => {
    e.preventDefault();
    if (!selectedUser || !amount) return alert('Please select a user and enter an amount');
    
    createBill(selectedUser, amount);
    setAmount('');
    setSelectedUser('');
    setShowForm(false);
    alert('Bill sent successfully!');
  };

  const getUserName = (id) => {
      const u = users.find(user => user.id === id);
      return u ? u.name : 'Unknown User';
  };

  return (
    <div className="space-y-6">
      
      {/* Header / Actions */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div>
              <h2 className="text-lg font-semibold text-gray-900">Billing Management</h2>
              <p className="text-sm text-gray-500">Create charges and track payments</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
              <Plus size={18} />
              New Charge
          </button>
      </div>

      {/* Create Bill Form */}
      {showForm && (
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 animate-in fade-in slide-in-from-top-4">
              <h3 className="font-semibold text-indigo-900 mb-4">Send New Invoice</h3>
              <form onSubmit={handleCreateBill} className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1 w-full">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-indigo-900 mb-2">Select User</label>
                      <select 
                        className="w-full border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm py-3 px-4 text-sm"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        required
                      >
                          <option value="">-- Choose User --</option>
                          {clientUsers.map(u => (
                              <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                          ))}
                      </select>
                  </div>
                  <div className="flex-1 w-full">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-indigo-900 mb-2">Amount ($)</label>
                      <input 
                        type="number" 
                        min="0.01" 
                        step="0.01"
                        className="w-full border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm py-3 px-4 text-sm"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                  </div>
                  <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">Send</button>
                  <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 px-4 py-2 text-sm font-medium hover:text-gray-700">Cancel</button>

              </form>
          </div>
      )}

      {/* Bill List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Date Sent</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bills && bills.length > 0 ? (
                bills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{bill.id}</td>
                    <td className="px-6 py-4 text-indigo-600">{getUserName(bill.userId)}</td>
                    <td className="px-6 py-4">{bill.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">${bill.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          bill.status === 'Paid'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        {bill.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                        <p>No bills found.</p>
                        <p className="text-xs mt-1">Create a charge to get started.</p>
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

export default Bills;
