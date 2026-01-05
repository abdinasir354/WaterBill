import React from "react";
import Navbar from "../../components/Navbar";
import { ShieldCheck, Zap, BarChart3, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";
const Home = () => {
  const navigate = useNavigate();

  return (
    
    <>
     
      <div className="min-h-screen flex flex-col bg-[#0f172a] relative text-[#f8fafc]">
        <section className="relative pt-40 pb-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute top-10 right-10 w-48 h-48 bg-[#22d3ee]/5 rounded-full blur-2xl"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/30 text-[#22d3ee] text-sm font-medium mb-6 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#facc15] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22d3ee]"></span>
              </span>
              The Future of Water Payments is Here
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight max-w-4xl mx-auto animate-fade-in-up">
              Manage Utility Bills <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">
                Like a Pro
              </span>
            </h1>

            <p className="text-xl text-[#cbd5e1] max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up">
              Stop waiting in line. Experience seamless, secure, and instant
              water bill payments with real-time usage analytics.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up">
              <button
                onClick={() => navigate("/signup")}
                className="bg-[#22d3ee] text-[#0f172a] px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 hover:shadow-xl transition-all"
              >
                Get Started Now
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => navigate("/about")}
                className="border border-[#22d3ee] text-[#22d3ee] px-6 py-3 rounded-xl hover:bg-[#22d3ee]/10 transition-all"
              >
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 border-t border-white/10 pt-12 max-w-4xl mx-auto animate-fade-in-up">
              <div className="text-center">
                <h4 className="text-4xl font-bold mb-1">50k+</h4>
                <p className="text-[#cbd5e1] text-sm uppercase tracking-wide">
                  Happy Users
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-4xl font-bold mb-1">$2M+</h4>
                <p className="text-[#cbd5e1] text-sm uppercase tracking-wide">
                  Processed Securely
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-4xl font-bold mb-1">99.9%</h4>
                <p className="text-[#cbd5e1] text-sm uppercase tracking-wide">
                  Uptime Guarantee
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#1e293b] relative overflow-hidden">
          <div className="absolute -top-32 left-0 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 right-0 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need
              </h2>
              <p className="text-[#cbd5e1] max-w-2xl mx-auto">
                We provide a complete ecosystem for managing your water
                utilities efficiently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap size={28} />,
                  title: "Instant Payments",
                  description:
                    "Pay your bills instantly using any credit card or bank transfer. Transactions are processed in real-time.",
                },
                {
                  icon: <ShieldCheck size={28} />,
                  title: "Bank-Grade Security",
                  description:
                    "Your data is encrypted with AES-256 standards. We prioritize your privacy and financial security above all.",
                },
                {
                  icon: <BarChart3 size={28} />,
                  title: "Usage Analytics",
                  description:
                    "Visualize your monthly water consumption with beautiful charts and get insights to save money.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="card group bg-[#0f172a] border border-white/10 p-6 rounded-2xl shadow-lg hover:bg-[#1e293b]/50 transition-colors"
                >
                  <div className="w-14 h-14 bg-[#22d3ee] rounded-lg flex items-center justify-center mb-6 text-[#0f172a] group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[#cbd5e1] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#0f172a] relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up">
                  Simple Steps to{" "}
                  <span className="text-[#22d3ee]">Peace of Mind</span>
                </h2>

                {[
                  {
                    step: 1,
                    title: "Create an Account",
                    desc: "Sign up in seconds. All you need is your email and meter number.",
                  },
                  {
                    step: 2,
                    title: "View Your Bill",
                    desc: "See your latest invoice and usage history instantly on your dashboard.",
                  },
                  {
                    step: 3,
                    title: "Pay & Relax",
                    desc: "Complete payment securely and receive an instant digital receipt.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 animate-fade-in-up">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full ${
                        i === 0
                          ? "bg-[#22d3ee] text-[#0f172a]"
                          : "bg-[#1e293b] border border-[#22d3ee] text-[#22d3ee]"
                      } flex items-center justify-center font-bold`}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-[#cbd5e1]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full md:w-1/2 relative animate-fade-in-up">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] rounded-2xl blur opacity-30"></div>
                <div className="relative bg-[#1e293b] p-8 rounded-2xl border border-white/10 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold">Water Bill #INV-2026</h3>
                    <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      Unpaid
                    </span>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div className="h-4 bg-[#0f172a] rounded w-3/4"></div>
                    <div className="h-4 bg-[#0f172a] rounded w-1/2"></div>
                    <div className="h-10 bg-[#0f172a] rounded w-full mt-4"></div>
                  </div>
                  <div className="flex justify-between items-end border-t border-white/10 pt-4">
                    <div>
                      <p className="text-xs text-[#cbd5e1]">Total Amount</p>
                      <p className="text-2xl font-bold">$25.00</p>
                    </div>
                    <button className="bg-[#22d3ee] text-[#0f172a] px-4 py-2 rounded font-bold text-sm hover:scale-105 transition-transform">
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] rounded-3xl p-12 border border-white/10 shadow-2xl animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to simplify your life?
              </h2>
              <p className="text-[#cbd5e1] mb-8 max-w-xl mx-auto">
                Join thousands of homeowners who trust AquaPay for their utility
                management.
              </p>
              <button
                onClick={() => navigate("/signup")}
                className="bg-[#22d3ee] text-[#0f172a] px-10 py-3 rounded-xl font-bold hover:scale-105 hover:shadow-xl transition-all"
              >
                Create Free Account
              </button>
            </div>
          </div>
        </section>
        <hr />
        <Footer/>
      </div>
    </>
  );
};

export default Home;
