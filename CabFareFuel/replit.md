# Cab Fare Calculator Pro

## Overview
A professional web application for calculating detailed cab fares with fuel cost estimation, multiple fare models, and itemized receipt generation. Built with React, Express, and TypeScript.

## Current State
- **Status**: Fully functional MVP
- **Last Updated**: November 3, 2025
- **Type**: Full-stack calculator application

## Features Implemented

### Core Features
1. **Fare Calculation Engine**
   - Configurable base fare, cost per mile, and cost per minute
   - Three preset fare models (Budget, Balanced, Premium)
   - Quick zone presets (NYC, Westchester, Newark, Long Island)
   - Real-time fare calculation with itemized breakdown

2. **Fuel Cost Estimation**
   - Support for Gasoline, Hybrid, and EV fuel types
   - MPG/kWh per mile input
   - Manual gas price entry
   - Optional fuel surcharge (flat or per-mile)

3. **Receipt Display & Export**
   - Itemized receipt showing all fare components
   - PDF export functionality using jsPDF
   - Transaction history storage (in-memory)
   - Receipt includes: base fare, distance charges, time charges, fuel surcharge, fuel cost, and total

4. **User Experience**
   - Mobile-responsive design with Tailwind CSS
   - Dark/light mode toggle with localStorage persistence
   - All form values saved to localStorage automatically
   - Clean, professional UI following Material Design principles

5. **Backend Infrastructure**
   - RESTful API for transaction management
   - In-memory storage for transaction history
   - Input validation using Zod schemas
   - Square payment integration structure (ready for API keys)

## Project Structure

### Frontend (`client/src/`)
- **`pages/Calculator.tsx`**: Main calculator page with all functionality
- **`components/`**:
  - `FareModelSelector.tsx`: Card-based fare model selection
  - `PresetButtons.tsx`: Quick zone preset buttons
  - `FareInputs.tsx`: Fare configuration form fields
  - `FuelInputs.tsx`: Fuel cost configuration
  - `ReceiptDisplay.tsx`: Itemized receipt card
  - `ThemeToggle.tsx`: Dark/light mode switcher
- **`lib/pdfExport.ts`**: PDF receipt generation utility

### Backend (`server/`)
- **`routes.ts`**: API endpoints for transactions and Square integration placeholders
- **`storage.ts`**: In-memory storage implementation with transaction CRUD operations

### Shared (`shared/`)
- **`schema.ts`**: TypeScript types and Zod schemas for data validation

## API Endpoints

### Transactions
- `POST /api/transactions` - Create new transaction record
- `GET /api/transactions` - Retrieve all transactions (with limit)
- `GET /api/transactions/:id` - Get specific transaction

### Square Integration (Placeholder)
- `POST /api/square/payment` - Process payment (requires SQUARE_ACCESS_TOKEN)
- `POST /api/square/receipt` - Email receipt (requires SQUARE_ACCESS_TOKEN)

## Data Model

### Transaction Schema
```typescript
{
  id: string (UUID)
  baseFare: decimal
  costPerMile: decimal
  costPerMinute: decimal
  distance: decimal
  duration: decimal
  fuelType: "gasoline" | "hybrid" | "ev"
  mpg: decimal
  gasPrice: decimal
  fuelSurchargeType: "flat" | "perMile" | null
  fuelSurchargeAmount: decimal | null
  fareModel: "balanced" | "premium" | "budget"
  totalFare: decimal
  fuelCost: decimal
  breakdown: JSON (FareCalculation object)
  createdAt: timestamp
}
```

## Configuration

### Environment Variables
- `SQUARE_ACCESS_TOKEN` (optional) - For Square payment processing
- `SESSION_SECRET` - Express session secret (already configured)

### LocalStorage Keys
- `cabFareSettings` - Saves all calculator form values
- `theme` - User's dark/light mode preference

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js, Node.js
- **Data**: In-memory storage (MemStorage)
- **Validation**: Zod schemas
- **PDF Generation**: jsPDF
- **State Management**: React Query (TanStack Query v5)
- **Routing**: Wouter

## Future Enhancements (Not Yet Implemented)
1. Live fuel price API integration (EIA or GasBuddy)
2. Complete Square payment processing implementation
3. Email receipt delivery via Square
4. PostgreSQL database for persistent storage
5. Transaction history page with CSV export
6. Comparative charts for different fare models
7. Multi-user authentication system

## Development Notes
- All values automatically save to localStorage
- PDF exports include full fare breakdown and timestamp
- Transaction records stored in memory (resets on server restart)
- Square integration ready - just add SQUARE_ACCESS_TOKEN secret
- Dark mode works across all components using CSS custom properties
