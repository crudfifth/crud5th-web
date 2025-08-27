# Overview

CRUD5th is a Japanese engineering team website built as a modern full-stack web application. The project showcases the team's services including contract development (受託開発), in-house service development (自社サービス開発), and DX/IT consulting (DX・ITコンサル). The application features a contact form system that allows potential clients to submit inquiries, which are stored in a database for follow-up.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and scroll-based animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development Server**: Custom Vite integration for hot module replacement in development
- **API Design**: RESTful endpoints with JSON communication
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Validation**: Zod schemas for runtime type validation shared between frontend and backend

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing
- **Connection**: Neon Database serverless PostgreSQL for production
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple

## Database Schema
- **Users Table**: Basic user authentication with username/password
- **Contacts Table**: Contact form submissions with name, email, inquiry type, message, and timestamp
- **Validation**: Comprehensive Zod schemas with Japanese error messages for user-facing validation

## Authentication and Authorization
- **Authentication Strategy**: Basic username/password authentication (prepared but not fully implemented)
- **Session Management**: Express sessions with PostgreSQL storage
- **Security**: Input validation and sanitization using Zod schemas

## API Structure
- **Contact Endpoint** (`POST /api/contact`): Handles contact form submissions with validation
- **Response Format**: Consistent JSON responses with success/error states and Japanese messages
- **Error Handling**: Detailed error responses with field-level validation feedback

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-zod**: Integration between Drizzle and Zod for schema validation
- **express**: Web application framework
- **react**: Frontend UI library
- **@tanstack/react-query**: Server state management

## UI and Styling
- **@radix-ui/***: Accessible UI primitives for components
- **tailwindcss**: Utility-first CSS framework
- **framer-motion**: Animation library for React
- **class-variance-authority**: Utility for creating variant-based component APIs
- **tailwind-merge**: Utility for merging Tailwind CSS classes

## Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and development experience
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling

## Form and Validation
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries
- **zod**: Runtime type validation and schema definition

## Database and Storage
- **connect-pg-simple**: PostgreSQL session store for Express
- **pg**: PostgreSQL client (indirect dependency through Drizzle)

## Utilities
- **date-fns**: Date manipulation library
- **nanoid**: Unique ID generation
- **wouter**: Lightweight routing library
- **clsx**: Conditional className utility