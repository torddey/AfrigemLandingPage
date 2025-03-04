import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';

interface NewsletterFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
  buttonText?: string;
  includeNames?: boolean;
}

type FormData = {
  email: string;
  // firstName?: string;
  // lastName?: string;
};

const NewsletterForm: React.FC<NewsletterFormProps> = ({ 
  onSubmit, 
  isSubmitting, 
  buttonText = 'Subscribe', 
  includeNames = false 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {includeNames && (
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
      )}
      
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
        {isSubmitting ? 'Processing...' : buttonText} 
        {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
      </button>
    </form>
  );
};

export default NewsletterForm;