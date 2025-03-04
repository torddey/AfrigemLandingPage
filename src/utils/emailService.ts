// This is a mock email service
// In a real application, you would integrate with a real email service like SendGrid, Mailchimp, etc.

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export const sendConfirmationEmail = async (email: string): Promise<boolean> => {
  // Mock implementation
  console.log(`Sending confirmation email to: ${email}`);
  
  const emailData: EmailData = {
    to: email,
    subject: 'Welcome to Afrigem Beauty!',
    body: `
      <h1>Welcome to Afrigem Beauty!</h1>
      <p>Thank you for joining our skincare community. We're excited to help you achieve your best skin!</p>
      <p>At Afrigem, we're more than just a beauty brand—we're your partner in achieving your skincare goals. With a unique combination of AI-powered skin analysis and personalized consultations from expert dermatologists, we make it easier than ever to find the right products and solutions for your skin type.</p>
      <p>Here's what you can look forward to:</p>
      <ul>
        <li>AI-powered skin analysis</li>
        <li>Personalized dermatologist consultations</li>
        <li>Curated skincare products</li>
        <li>Easy online shopping</li>
      </ul>
      <p>Stay tuned for exclusive offers and skincare tips!</p>
      <p>Best regards,<br>The Afrigem Beauty Team</p>
    `
  };
  
  try {
    // In a real application, you would make an API call to your email service here
    // For now, we'll just simulate a successful email send
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
};