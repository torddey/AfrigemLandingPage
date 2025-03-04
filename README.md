# Afrigem Beauty - Skincare Platform

A modern, responsive landing page for Afrigem Beauty, a platform that connects users with dermatologists and skincare products.

## Features

- Responsive design for all device sizes
- Email newsletter subscription with Mailchimp integration
- Form validation
- Toast notifications
- Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```
VITE_MAILCHIMP_API_KEY=your-mailchimp-api-key
VITE_MAILCHIMP_SERVER_PREFIX=us1
VITE_MAILCHIMP_LIST_ID=your-audience-list-id
```

4. Start the development server:

```bash
npm run dev
```

## Mailchimp Integration

This project uses the official Mailchimp Marketing API to handle newsletter subscriptions. To set up Mailchimp:

1. Create a Mailchimp account if you don't have one
2. Create an API key in your Mailchimp account
3. Note your server prefix (e.g., us1, us2) from your Mailchimp URL
4. Create or identify the List/Audience ID you want to use
5. Add these details to your `.env` file

## Project Structure

- `src/components/` - React components
- `src/utils/` - Utility functions including Mailchimp service
- `src/server/` - Mock server-side API handlers

## Deployment

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- React Hook Form
- React Toastify
- Lucide React (for icons)
- Mailchimp Marketing API