# QuickCart Pro - E-Commerce Platform

A modern, minimal, and functional e-commerce platform built with Next.js 14, Prisma ORM, and NextAuth.js. This is Phase 1 Iteration 1.1 of the MVP development plan.

## 🚀 Features (Phase 1.1)

- **Product Catalog**: Browse products with beautiful cards and responsive grid layout
- **Google OAuth Authentication**: Secure sign-in using Google OAuth 2.0
- **Admin Panel**: Add and manage products (admin role required)
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Built with shadcn/ui components
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Prisma ORM with PostgreSQL (Neon)
- **Authentication**: NextAuth.js with Google OAuth
- **Deployment**: Vercel (ready for deployment)

## 📋 Prerequisites

- Node.js 18.13.0 (LTS)
- npm or yarn package manager
- PostgreSQL database (Neon recommended for production)
- Google OAuth 2.0 credentials

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd quickcart-pro
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and fill in your values:

```bash
cp env.example .env.local
```

Update `.env.local` with your actual values:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/quickcart_pro"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional: Set admin email
ADMIN_EMAIL="your-admin-email@gmail.com"
```

### 4. Set up the database

```bash
# Generate Prisma client
npm run db:generate

# Push the schema to your database
npm run db:push

# (Optional) Open Prisma Studio to view/edit data
npm run db:studio
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Set the authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local` file

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database named `quickcart_pro`
3. Update your `DATABASE_URL` in `.env.local`

### Option 2: Neon (Recommended for production)

1. Go to [Neon](https://neon.tech/) and create an account
2. Create a new project
3. Copy the connection string to your `DATABASE_URL`

## 🏗️ Project Structure

```
quickcart-pro/
├── app/                    # Next.js 14 App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── admin/             # Admin-specific components
│   ├── layout/            # Layout components
│   ├── products/          # Product-related components
│   ├── providers/         # Context providers
│   └── ui/                # Reusable UI components
├── lib/                    # Utility functions
│   ├── db.ts              # Database connection
│   ├── products.ts        # Product data layer
│   └── utils.ts           # Utility functions
├── prisma/                 # Database schema and migrations
│   └── schema.prisma      # Prisma schema
├── .env.local             # Environment variables
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to update these in your production environment:

- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - A strong secret key
- `DATABASE_URL` - Your production database URL
- `GOOGLE_CLIENT_ID` - Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Your Google OAuth client secret

## 🔒 Security Features

- Google OAuth 2.0 authentication
- Role-based access control (Admin/Customer)
- Protected admin routes
- Environment variable protection
- CSRF protection via NextAuth.js

## 🎯 MVP Development Plan

This is **Phase 1 Iteration 1.1** of the development plan:

- ✅ **Phase 1.1**: Product Catalog + Google Sign-In (Current)
- 🔄 **Phase 1.2**: Shopping Cart + Checkout
- 🔄 **Phase 1.3**: Payments Integration (Stripe)
- 🔄 **Phase 2.1**: Seller Dashboard
- 🔄 **Phase 2.2**: Product Reviews & Ratings
- 🔄 **Phase 2.3**: Order Tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify your environment variables
3. Ensure your database is running
4. Check that Google OAuth is properly configured

## 🎉 What's Working

- ✅ Product catalog display
- ✅ Google OAuth authentication
- ✅ Admin panel (for admin users)
- ✅ Responsive design
- ✅ TypeScript integration
- ✅ Prisma database integration
- ✅ Sample product data
- ✅ Role-based access control

## 🚧 What's Next

- Shopping cart functionality
- Checkout process
- Payment integration
- Order management
- User reviews and ratings
- Email notifications

---

Built with ❤️ using Next.js 14, Prisma, and modern web technologies.
