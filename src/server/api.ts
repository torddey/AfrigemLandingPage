import { subscribeToMailchimp } from '../utils/mailchimpService';

/**
 * This is a mock server-side API handler
 * In a real application, this would be implemented in a server environment
 * such as Express.js, Next.js API routes, or a serverless function
 */

export interface SubscribeRequest {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
}

/**
 * Handle newsletter subscription requests
 * @param data - The subscription data
 * @returns A promise with the subscription result
 */
export const handleSubscribeRequest = async (
  data: SubscribeRequest
): Promise<SubscribeResponse> => {
  try {
    // Validate the email
    if (!data.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      return {
        success: false,
        message: 'Please provide a valid email address.'
      };
    }

    // Subscribe to Mailchimp
    const result = await subscribeToMailchimp(
      data.email,
      data.firstName,
      data.lastName
    );

    return result;
  } catch (error) {
    console.error('Error in subscription handler:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    };
  }
};