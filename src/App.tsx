import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { 
  Sparkles, 
  CheckCircle, 
  Users, 
  ShoppingBag, 
  Star, 
  MessageSquare, 
  Shield, 
  ArrowRight,
  Mail,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import FeatureCard from './components/FeatureCard';
import TestimonialCard from './components/TestimonialCard';
import { subscribeViaServerRoute } from './utils/mailchimpService';
import { sendConfirmationEmail } from './utils/emailService';

type FormData = {
  email: string;
  firstName?: string;
  lastName?: string;
};

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Subscribe to Mailchimp
      const result = await subscribeViaServerRoute(data.email, data.firstName, data.lastName);
      
      if (result.success) {
        // Send confirmation email via our own service as a backup
        await sendConfirmationEmail(data.email);
        
        // Show success message
        toast.success(result.message);
        setIsSubscribed(true);
        reset();
      } else {
        toast.warning(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-hero-pattern bg-cover bg-center py-20 md:py-32">
        <div className="absolute inset-0 bg-accent/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Helping You Achieve Your Best Skin
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-cormorant">
              Connect with world-class dermatologists and trusted beauty brands
            </p>
            <div className="bg-white/95 p-8 rounded-lg shadow-lg max-w-xl mx-auto">
              <h3 className="text-2xl font-bold text-accent mb-4">
                Join Our Skincare Community
              </h3>
              <p className="text-gray-600 mb-6">
                Sign up to receive personalized skincare tips and exclusive offers.
              </p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name (Optional)"
                      className="input-field"
                      {...register('firstName')}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name (Optional)"
                      className="input-field"
                      {...register('lastName')}
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <button 
                  type="submit" 
                  className="btn-primary w-full flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Get Started'} 
                  {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                </button>
              </form>
              
              {isSubscribed && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Thank you for subscribing! Check your email for confirmation.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-subtitle">Simplifying Skincare for Everyone</p>
            <p className="text-gray-600 leading-relaxed">
              At Afrigem, our mission is to simplify skincare by providing access to professional dermatological advice and high-quality products tailored to your skin's unique needs. We understand that finding the right skincare can be overwhelming, especially when faced with endless options and limited information. That's why we've created a platform that brings together expert dermatologists and certified products, making skincare simple, effective, and accessible.
            </p>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Your Journey to Healthier Skin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Sparkles className="h-10 w-10 text-primary" />}
              title="AI Skin Analysis"
              description="Our AI-powered tool provides fast and accurate assessments of your skin condition. Simply upload a photo and let our advanced algorithm do the rest."
              number={1}
            />
            
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Dermatologist Consultations"
              description="Receive expert advice from our network of experienced dermatologists based on your AI analysis."
              number={2}
            />
            
            <FeatureCard 
              icon={<Star className="h-10 w-10 text-primary" />}
              title="Curated Products"
              description="Our platform features a curated selection of dermatologist-approved skincare products tailored specifically for your skin type."
              number={3}
            />
            
            <FeatureCard 
              icon={<ShoppingBag className="h-10 w-10 text-primary" />}
              title="Easy Online Shopping"
              description="Conveniently shop for the suggested products through our platform, all delivered directly to your door."
              number={4}
            />
          </div>
        </div>
      </section>
      
      {/* Why Afrigem Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Afrigem?</h2>
            <p className="section-subtitle">Making Skincare Personal</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary p-8 rounded-lg shadow-md">
              <MessageSquare className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-accent mb-3">Expert Advice at Your Fingertips</h3>
              <p className="text-gray-600">
                No need to wait for in-person appointments. With Afrigem, you can consult with a qualified dermatologist from the comfort of your home.
              </p>
            </div>
            
            <div className="bg-secondary p-8 rounded-lg shadow-md">
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-accent mb-3">Trusted, Tailored Products</h3>
              <p className="text-gray-600">
                Our platform features products that have been specifically selected for your skin, ensuring they are effective for your unique skin type and climate.
              </p>
            </div>
            
            <div className="bg-secondary p-8 rounded-lg shadow-md">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-accent mb-3">Affordability and Accessibility</h3>
              <p className="text-gray-600">
                We offer affordable AI skin analysis and virtual consultations, so you can take control of your skincare routine without overspending.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real Results, Real Stories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Sarah Johnson"
              location="New York, USA"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
              quote="Afrigem completely transformed my skincare routine. The AI analysis was spot-on, and the dermatologist's advice helped clear my acne in just weeks!"
              rating={5}
            />
            
            <TestimonialCard 
              name="Michael Chen"
              location="Toronto, Canada"
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
              quote="I've struggled with hyperpigmentation for years. The personalized product recommendations from Afrigem made a noticeable difference in just a month."
              rating={5}
            />
            
            <TestimonialCard 
              name="Amara Okafor"
              location="Lagos, Nigeria"
              image="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
              quote="Finding products that work for my skin type in my climate was always a challenge. Afrigem connected me with a dermatologist who understood my needs perfectly."
              rating={4}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-cormorant">
              Discover the power of personalized skincare with Afrigem Beauty. Sign up today for your free AI skin analysis and take the first step towards achieving clear, radiant skin!
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className={`input-field flex-1 ${errors.email ? 'border-red-500' : ''}`}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              <button 
                type="submit" 
                className="bg-white text-primary px-6 py-3 rounded-md hover:bg-white/90 transition-all duration-300 font-medium whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Join Now'}
              </button>
            </form>
            {errors.email && (
              <p className="text-white text-sm mt-2">{errors.email.message}</p>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;