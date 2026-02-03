import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Blindedata</span>
            </Link>
            <p className="text-white/70 max-w-md">
              Transforming patient privacy in laboratory analysis through Native Dissociation technology. Your identity and medical data never meet.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#portals" className="hover:text-white transition-colors">Portals</a>
              </li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="font-semibold mb-4">Compliance</h4>
            <ul className="space-y-2 text-white/70">
              <li>HIPAA Compliant</li>
              <li>GDPR Ready</li>
              <li>SOC 2 Type II</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Blindedata. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
