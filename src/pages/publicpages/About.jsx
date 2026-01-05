import React from "react";
import { Droplet, Users, Globe, Award } from "lucide-react";
import Footer from "../../components/Footer";

function About() {
  return (
    <>
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-cyan-400">AquaPay</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A modern platform designed to make water bill payments simple,
              transparent, and secure.
            </p>
          </div>
        </div>
        <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase mb-4">
              <Droplet size={18} />
              Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Simplifying Water Payments <br /> for Everyone
            </h2>

            <p className="text-slate-400 mb-4 leading-relaxed">
              AquaPay was created to eliminate the frustration of traditional
              water bill systems. Long queues, paperwork, and unclear billing
              motivated us to build something better.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our platform provides real-time billing, digital payments, and
              transparent usage tracking for households and institutions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "10k+", label: "Active users" },
              { value: "50+", label: "Cities Covered" },
              { value: "24/7", label: "Customer Support" },
              { value: "99.9%", label: "System Uptime" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center"
              >
                <h3 className="text-3xl font-bold mb-1">{item.value}</h3>
                <p className="text-slate-400 text-sm uppercase tracking-wide">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users size={32} />,
                  title: "Customer First",
                  text: "We design every feature with real users in mind.",
                },
                {
                  icon: <Globe size={32} />,
                  title: "Sustainability",
                  text: "Supporting responsible water usage through data.",
                },
                {
                  icon: <Award size={32} />,
                  title: "Reliability",
                  text: "Secure systems, stable infrastructure, and trust.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-8 hover:border-cyan-400 transition"
                >
                  <div className="text-cyan-400 mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
export default About;
