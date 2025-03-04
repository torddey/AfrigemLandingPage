import React, { useState } from 'react';
import { Mail, Instagram, Facebook, Twitter, MapPin, Phone, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { subscribeViaServerRoute } from '../utils/mailchimpService';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await subscribeViaServerRoute(email);
      
      if (result.success) {
        toast.success(result.message);
        setIsSubscribed(true);
        setEmail('');
      } else {
        toast.warning(result.message);
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-accent text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Afrigem Beauty</h3>
            <p className="text-white/80 mb-4">
              Your partner in achieving your skincare goals with AI-powered analysis and expert dermatologists.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-primary transition-colors">Services</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-primary transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-primary transition-colors">AI Skin Analysis</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-primary transition-colors">Dermatologist Consultations</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-primary transition-colors">Personalized Skincare</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-primary transition-colors">Product Recommendations</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-primary transition-colors">Skincare Education</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Subscribe to Our Newsletter</h3>
            <p className="text-white/80 mb-4">
              Get the latest skincare tips and exclusive offers delivered to your inbox.
            </p>
            
            {isSubscribed ? (
              <div className="p-3 bg-primary/20 text-white rounded-md flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
            
            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2 font-playfair">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <span className="text-white/80">AU9 Garlic St. Kwabenya, Accra Ghana.</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-white/80">+233 (050) 609-0494</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-white/80">support@afrigembeauty.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Afrigem Beauty. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-primary text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;