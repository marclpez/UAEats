# Restaurant Reservation System

## Overview

This is a modern restaurant reservation system built as a full-stack web application. The system allows users to browse restaurants, select menu items, choose time slots, and make reservations. It features a mobile-first design with a React frontend and Express.js backend, using PostgreSQL for data persistence and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite for development
- **Routing**: Wouter for client-side routing
- **State Management**: Context API with useReducer for reservation state
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Design Philosophy**: Mobile-first responsive design optimized for restaurant booking

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling
- **Request Handling**: Express middleware for JSON parsing and logging
- **Development**: Vite middleware integration for hot reloading in development

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Schema**: Structured tables for restaurants, menu items, time slots, and reservations
- **Connection**: Neon Database serverless PostgreSQL
- **Development Storage**: In-memory storage class for development/testing
- **Migrations**: Drizzle Kit for schema management

### Database Schema Design
- **restaurants**: Core restaurant information with ratings and availability
- **menuItems**: Menu items categorized by course (primer, segundo, postre)
- **timeSlots**: Available reservation times per restaurant
- **reservations**: Complete reservation records with selected items and pricing

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Basic session handling setup with connect-pg-simple (prepared but not active)
- **Security**: Basic CORS and request validation

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing
- **express**: Node.js web framework
- **drizzle-orm**: Type-safe ORM for PostgreSQL

### Database and Storage
- **@neondatabase/serverless**: PostgreSQL connection for Neon Database
- **drizzle-kit**: Database schema management and migrations
- **connect-pg-simple**: PostgreSQL session store (configured but not active)

### UI and Styling
- **@radix-ui/***: Comprehensive UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for components
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type safety and development experience
- **tsx**: TypeScript execution for server development
- **esbuild**: Fast bundling for production builds

### Validation and Forms
- **zod**: Schema validation
- **drizzle-zod**: Integration between Drizzle and Zod for type-safe schemas
- **@hookform/resolvers**: Form validation resolvers

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class composition
- **nanoid**: Unique ID generation