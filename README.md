# WiseCars - Luxury Car Sales Website

A modern, responsive car sales website with a sleek black theme, featuring car browsing, filtering, and customer service capabilities.

## Features

- **Modern Black Theme Design**: A sleek, luxury-focused design with complementary dark shades and accent colors
- **Responsive Layout**: Fully responsive design that works on mobile, tablet, and desktop
- **Car Browsing**: Browse cars by type (luxury, sports, SUV) and price range
- **Car Details**: View detailed specifications, features, and warranty information for each car
- **Contact Form**: Complete contact form with validation for customer inquiries
- **Brand Showcase**: Display of premium car brands available in the inventory

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  - Framer Motion for animations
  - Wouter for routing
  - TanStack Query for data fetching
  - ShadCN UI components
  - React Hook Form with Zod validation

- **Backend**:
  - Node.js
  - Express
  - In-memory data storage (can be easily replaced with a database)
  - API routes for car data and contact submissions

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/wisecars.git
   cd wisecars
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - Reusable UI components
  - `/src/pages` - Page components
  - `/src/lib` - Utility functions and hooks
  - `/src/hooks` - Custom React hooks

- `/server` - Backend Express server
  - `routes.ts` - API route definitions
  - `storage.ts` - Data storage implementation

- `/shared` - Shared code between frontend and backend
  - `schema.ts` - Zod schemas and TypeScript types

## Customization

- **Color Theme**: Modify the color variables in `client/src/index.css` to change the application's color scheme
- **Car Data**: Add or modify car data in the `seedCars` method in `server/storage.ts`
- **Brand Logos**: Update brand logos in the `BrandSection.tsx` component

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Car images sourced from Unsplash and Pixabay
- Icons from Lucide React and React Icons