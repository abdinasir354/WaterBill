import React from "react";
import {
  Droplet,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-slate py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Droplet
                size={24}
                className="text-sky-500 hover:text-sky-600 transition duration-200"
              />
              <span className="text-2xl font-bold text-white tracking-wide">
                AquaPay
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Simplifying water bill payments for everyone. Secure, fast, and
              reliable utility management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-aqua transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-aqua transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-aqua transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-aqua transition-colors">
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-aqua" />
                <span>support@aquapay.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-aqua" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-aqua" />
                <span>123 Water Street, Blue City</span>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-white font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-navy-800 rounded-full hover:bg-aqua hover:text-navy-900 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-navy-800 rounded-full hover:bg-aqua hover:text-navy-900 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-navy-800 rounded-full hover:bg-aqua hover:text-navy-900 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-sm text-slate-dark">
          <p>&copy; {new Date().getFullYear()} AquaPay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
