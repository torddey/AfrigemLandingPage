import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize the Mailchimp client
mailchimp.setConfig({
  apiKey: import.meta.env.VITE_MAILCHIMP_API_KEY,
  server: import.meta.env.VITE_MAILCHIMP_SERVER_PREFIX, // e.g., us1, us2, etc.
});

/**
 * Subscribe a user to the Mailchimp list
 * @param email - User's email address
 * @param firstName - User's first name (optional)
 * @param lastName - User's last name (optional)
 * @returns Promise with the subscription result
 */
export const subscribeToMailchimp = async (
  email: string,
  firstName?: string,
  lastName?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // Prepare the subscriber data
    const subscriberData: any = {
      email_address: email,
      status: 'subscribed', // Use 'pending' if you want double opt-in
    };

    // Add merge fields if first name or last name is provided
    if (firstName || lastName) {
      subscriberData.merge_fields = {};
      
      if (firstName) {
        subscriberData.merge_fields.FNAME = firstName;
      }
      
      if (lastName) {
        subscriberData.merge_fields.LNAME = lastName;
      }
    }

    // Add the member to the list
    const response = await mailchimp.lists.addListMember(
      import.meta.env.VITE_MAILCHIMP_LIST_ID,
      subscriberData
    );

    console.log('Successfully added contact as an audience member:', response);
    return {
      success: true,
      message: 'Thank you for subscribing! Check your email for confirmation.'
    };
  } catch (error: any) {
    console.error('Failed to add contact to Mailchimp:', error);
    
    // Handle existing subscribers
    if (error.status === 400 && error.response?.text) {
      const responseBody = JSON.parse(error.response.text);
      
      // If the email is already subscribed
      if (responseBody.title === 'Member Exists') {
        return {
          success: false,
          message: 'This email is already subscribed to our newsletter.'
        };
      }
    }
    
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    };
  }
};

/**
 * Create a server-side API route to handle Mailchimp subscription
 * This is a mock implementation for demonstration purposes
 * In a real application, you would create an actual API endpoint
 */
export const subscribeViaServerRoute = async (
  email: string,
  firstName?: string,
  lastName?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // In a real application, you would make a fetch request to your server endpoint
    // For now, we'll directly use the subscribeToMailchimp function
    return await subscribeToMailchimp(email, firstName, lastName);
  } catch (error) {
    console.error('Failed to subscribe via server route:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    };
  }
};