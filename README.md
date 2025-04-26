# AI Safety Incident Dashboard

A modern web application for monitoring and reporting AI safety incidents. Built with React and Next.js, this dashboard provides a comprehensive interface for tracking, analyzing, and managing AI-related safety concerns.

## Features

- 📊 Real-time incident monitoring dashboard
- 📝 Incident reporting and management
- 🎨 Modern, responsive UI with dark mode support
- 📈 Interactive data visualization
- 🔍 Advanced filtering and search capabilities
- 📱 Mobile-friendly design

## Tech Stack

### Frontend
- **React 18** - UI library
- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **Shadcn/ui** - Re-usable components built with Radix UI
- **Recharts** - Composable charting library
- **Zustand** - State management
- **date-fns** - Modern JavaScript date utility library

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-safety-dashboard.git
cd ai-safety-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ai-safety-dashboard/
├── app/                  # Next.js app directory
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── dashboard.tsx   # Main dashboard component
│   ├── incident-cards.tsx # Incident display
│   ├── bento-grid.tsx  # Grid layout component
│   ├── report-form.tsx # Incident reporting form
│   ├── sidebar.tsx     # Navigation sidebar
│   └── theme-provider.tsx # Theme context provider
├── public/             # Static assets
└── package.json        # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/) 