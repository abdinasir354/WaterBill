import React from "react";
import Footer from "../../components/Footer";
import { CreditCard } from "lucide-react";
import { History } from "lucide-react";
import { Bell } from "lucide-react";
import { Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Service() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-slate-950 text-white">
        <section className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <h1 className="text-6xl text-white text-center font-bold">
              Our Services
            </h1>
            <p className=" text-center">
              Comprehensive solutions for modern utility management.
            </p>
          </div>
        </section>

        <section className="bg-slate-950 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <CreditCard size={22} />,
                  title: "Online Payments",
                  desc: "Pay securely using credit cards, debit cards, or bank transfers in real time.",
                },
                {
                  icon: <History size={22} />,
                  title: "Usage History",
                  desc: "Track your consumption and download detailed PDF billing statements.",
                },
                {
                  icon: <Bell size={22} />,
                  title: "Smart Alerts",
                  desc: "Receive instant notifications for bills, payments, and unusual usage.",
                },
                {
                  icon: <Smartphone size={22} />,
                  title: "Mobile Friendly",
                  desc: "Fully responsive dashboard that works perfectly on any device.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-2"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-400/10 text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 border-t border-slate-800 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              How AquaPay Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Create Account",
                  desc: "Sign up and verify your utility account.",
                },
                {
                  step: "02",
                  title: "View Bill",
                  desc: "Access real-time billing and usage details.",
                },
                {
                  step: "03",
                  title: "Make Payment",
                  desc: "Pay securely using multiple payment methods.",
                },
                {
                  step: "04",
                  title: "Get Confirmation",
                  desc: "Receive instant receipts and notifications.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center"
                >
                  <span className="text-cyan-400 text-sm font-bold tracking-widest">
                    STEP {item.step}
                  </span>
                  <h3 className="text-lg font-semibold mt-3 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Secure & Reliable Payments
            </h2>
            <p className="text-slate-400 mb-10">
              AquaPay uses industry-standard encryption and secure payment
              gateways to protect your data and transactions.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                "256-bit SSL Encryption",
                "Secure Payment Gateway",
                "Data Privacy Protection",
                "99.9% Uptime",
              ].map((item, i) => (
                <span
                  key={i}
                  className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cyan-500/10 border-t border-cyan-400/20 py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Simplify Your Payments?
            </h2>
            <p className="text-slate-300 mb-10">
              Join thousands of users managing their water bills faster and
              smarter.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-3 bg-cyan-400 text-slate-950 font-semibold rounded-lg hover:bg-cyan-300 transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Service;
