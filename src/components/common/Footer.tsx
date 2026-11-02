import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3D2117] text-[#F5E7DA] pt-16 pb-12 border-t border-[#9B421F]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand info (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E87832] to-[#9B421F] flex items-center justify-center text-white shadow-lg">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white font-mono">
                  SIPZY
                </span>
                <span className="block text-[10px] text-[#E87832] tracking-widest uppercase font-semibold">
                  One Platform for Coffee
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F5E7DA]/80 leading-relaxed max-w-sm">
              Connecting coffee enthusiasts with Indonesia’s finest independent roasters and artisan cafes.
              Order seamlessly, carry your digital loyalty card, and enjoy exclusive privileges.
            </p>

            <div className="pt-2 text-xs text-[#F5E7DA]/70 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E87832]" />
                <span>Kebayoran Baru, Jakarta Selatan, 12180</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E87832]" />
                <span>concierge@sipzy.id</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E87832]" />
                <span>+62 21 5082 8990</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5E7DA]/80">
              <li>
                <Link to="/discover" className="hover:text-white transition-colors">
                  Discover Coffee Shops
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="hover:text-white transition-colors">
                  Rewards Catalog
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="hover:text-white transition-colors">
                  Current Promotions
                </Link>
              </li>
              <li>
                <Link to="/wallet" className="hover:text-white transition-colors">
                  Digital Loyalty Wallet
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About SIPZY Ecosystem
                </Link>
              </li>
            </ul>
          </div>

          {/* Membership Tiers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Loyalty Levels
            </h4>
            <ul className="space-y-2 text-xs text-[#F5E7DA]/80">
              <li className="flex justify-between py-1 border-b border-white/5">
                <span>Bronze</span>
                <span className="text-[#D99A6C]">0 - 399 pts</span>
              </li>
              <li className="flex justify-between py-1 border-b border-white/5">
                <span>Silver</span>
                <span className="text-slate-300">400 - 999 pts</span>
              </li>
              <li className="flex justify-between py-1 border-b border-white/5">
                <span>Gold</span>
                <span className="text-[#E5A93B]">1.000 - 1.999 pts</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Black Diamond</span>
                <span className="text-amber-300">2.000+ pts</span>
              </li>
            </ul>
          </div>

          {/* Merchants & Partnering */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              For Merchants
            </h4>
            <p className="text-xs text-[#F5E7DA]/80 leading-relaxed mb-3">
              Are you a roastery or specialty cafe? Join the SIPZY merchant network and delight recurring customers.
            </p>
            <Link
              to="/about"
              className="inline-block py-2 px-3.5 rounded-xl bg-[#E87832] hover:bg-[#d66923] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Partner With Us
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5E7DA]/60">
          <p>© {new Date().getFullYear()} SIPZY Technologies. Good Coffee, Better Rewards. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <div className="flex items-center gap-3 text-white/70 ml-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
