import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock Signup
    await register(name, email, password);
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-sans">
       <nav className="p-6 flex justify-between items-center text-white">
          <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            AquaPay
          </Link>
          <Link to="/" className="text-sm text-slate-400 hover:text-white transition">Back to Home</Link>
       </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-slate-800 p-10 rounded-2xl shadow-2xl border border-white/5">
          <h2 className="text-3xl font-bold text-center text-white mb-2">Create Account</h2>
          <p className="text-center text-slate-400 mb-8">Join us to manage your payments effortlessly</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Full Name</label>
              <div className="relative flex items-center">
                <User size={20} className="absolute left-3 text-slate-500" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <div className="relative flex items-center">
                <Mail size={20} className="absolute left-3 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <div className="relative flex items-center">
                <Lock size={20} className="absolute left-3 text-slate-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <button 
                type="submit" 
                className="w-full bg-cyan-500 text-slate-900 py-3 px-4 rounded-lg font-bold hover:bg-cyan-400 hover:-translate-y-0.5 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-8 text-center text-slate-400 text-sm">
            <p>Already have an account? <Link to="/login" className="text-cyan-400 font-medium hover:underline hover:text-cyan-300">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;