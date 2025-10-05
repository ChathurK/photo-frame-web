# FRAMES.LK - Photo Frame Landing Page

A modern, multilingual landing page for a photo frame business built with React, Vite, and Tailwind CSS.

## Features

- 🌐 Multilingual support (English & Sinhala)
- 📱 Responsive design
- 🎨 Custom photo frame showcase
- 💬 WhatsApp integration for orders
- ⚡ Fast loading with minimal animations
- 🛠️ Ready for backend integration

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Environment Variables

Create a `.env` file with:
```
VITE_API_URL=http://localhost:3001/api
VITE_WHATSAPP_NUMBER=+94771234567
```

### Project Structure

```
src/
├── components/          # React components
│   ├── LanguageSelector.jsx
│   ├── Header.jsx
│   ├── HeroSection.jsx
│   ├── WorksSection.jsx
│   ├── AboutSection.jsx
│   ├── TestimonialsSection.jsx
│   ├── OrderSection.jsx
│   └── Footer.jsx
├── services/           # API services
│   └── apiService.js
├── utils/             # Utility functions
│   ├── translations.js
│   └── imageUtils.js
├── hooks/            # Custom React hooks
└── App.jsx
```

## Backend Integration

The project is structured to easily connect with a backend API. Update the `VITE_API_URL` environment variable to point to your backend server.

Available API methods in `apiService.js`:
- `submitOrder(orderData)` - Submit photo frame orders
- `getWorks()` - Fetch portfolio works
- `getTestimonials()` - Fetch customer testimonials

## Deployment

Build for production:
```bash
npm run build
```

The `dist` folder will contain the production-ready files.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
