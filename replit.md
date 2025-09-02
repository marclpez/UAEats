# MenuReserve - Restaurant Reservation System

## Overview

MenuReserve is a modern, mobile-first restaurant reservation application that allows users to browse restaurants, select menu items, choose time slots, and complete reservations. The system is designed as a full-stack web application with mobile capabilities through Capacitor, featuring a streamlined three-course meal selection process (primer plato, segundo plato, postre) and real-time reservation management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing without unnecessary complexity
- **State Management**: React Context API with useReducer for reservation state management
- **UI Framework**: Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for consistent theming
- **Data Fetching**: TanStack Query (React Query) for server state management, caching, and synchronization
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Mobile Support**: Capacitor framework for native mobile app deployment on iOS and Android

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API development
- **Language**: TypeScript with ES modules for consistency with frontend
- **API Design**: RESTful endpoints following conventional patterns for restaurants, menus, time slots, and reservations
- **Development**: Vite middleware integration for seamless hot reloading during development
- **Error Handling**: Centralized error handling with structured response formatting
- **Request Processing**: JSON parsing and logging middleware for debugging and monitoring

### Data Storage Solutions
- **Database**: PostgreSQL as the primary relational database
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Schema Design**: Normalized tables for restaurants, menu items, time slots, and reservations with proper foreign key relationships
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment
- **Development Storage**: In-memory storage implementation for development and testing environments
- **Migrations**: Drizzle Kit for schema versioning and database migrations

### Database Schema Design
- **restaurants**: Core restaurant information including name, description, rating, pricing, and availability status
- **menuItems**: Menu items categorized by course type (primer, segundo, postre) with pricing
- **timeSlots**: Available reservation times per restaurant for scheduling
- **reservations**: Complete reservation records with selected menu items, pricing calculations, and confirmation status

### Mobile Application Architecture
- **Capacitor Integration**: Native mobile app capabilities with status bar and splash screen management
- **Platform Detection**: Conditional mobile-specific features using Capacitor's platform detection
- **Build Process**: Separate build commands for web and mobile deployment
- **Native Features**: Haptic feedback, status bar styling, and splash screen control

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Advanced server state management with caching, background updates, and error handling
- **wouter**: Lightweight routing library for single-page application navigation
- **@hookform/resolvers**: Integration layer between React Hook Form and validation libraries

### UI and Design Dependencies
- **@radix-ui/react-***: Comprehensive set of accessible, unstyled UI primitives for building consistent interfaces
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **class-variance-authority**: Type-safe variant management for component styling
- **lucide-react**: Modern icon library with consistent design language

### Database and Validation Dependencies
- **drizzle-orm**: Type-safe ORM for PostgreSQL with excellent TypeScript integration
- **@neondatabase/serverless**: Serverless PostgreSQL driver for edge computing environments
- **zod**: TypeScript-first schema validation for runtime type checking

### Mobile Development Dependencies
- **@capacitor/core**: Core Capacitor framework for hybrid app development
- **@capacitor/android**: Android platform integration for native app deployment
- **@capacitor/status-bar**: Native status bar control and styling
- **@capacitor/splash-screen**: Splash screen management for app initialization
- **@capacitor/haptics**: Native haptic feedback for enhanced user experience

### Development and Build Dependencies
- **vite**: Modern build tool with fast development server and optimized production builds
- **typescript**: Static type checking for improved code quality and developer experience
- **esbuild**: Fast JavaScript bundler for server-side code compilation
- **tsx**: TypeScript execution environment for development server