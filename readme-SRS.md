# Software Requirements Specification (SRS)  
## E-Commerce Platform

### Document Information
- **Version**: 1.0  
- **Product Name**: QuickCart Pro  
- **Development Approach**: Iterative MVP Development  
- **Node.js Version**: 22.18.0 (LTS)  
- **Authentication**: Google OAuth 2.0 Only  

---

## Technology Stack Specification

### **Runtime Environment**
- **Node.js 22.18.0 (LTS)** – Stable long-term support version with broad compatibility for modern libraries and native ES Modules support.

### **Frontend Framework**
- **Next.js 14 (App Router)** – React-based full-stack framework compatible with Node 22  
- **TypeScript** – Static typing with full support in Node 22 environment  
- **Tailwind CSS** – Utility-first responsive styling, no Node version dependency issues  
- **shadcn/ui** – Accessible UI components compatible with React 18 and Next.js 14  
- **Lucide Icons** – Icon set working seamlessly with React and Next.js  

### **Backend & Database**
- **Prisma ORM (latest stable)** – Fully compatible with Node 22, leveraging Prisma Migrate and Prisma Client  
- **Neon (PostgreSQL)** – Cloud-hosted DB, independent of Node version  
- **NextAuth.js (latest version)** – Auth library supporting Node 22, with Google OAuth 2.0 provider  

### **Deployment & Infrastructure**
- **Vercel** – Node 22 runtime support out of the box for Serverless and Edge Functions  
- **Vercel Edge Functions** – Compatible with Node 22 features  
- **Vercel Analytics** – Usage and performance metrics integrated smoothly  
- **GitHub Integration** – CI/CD pipelines configured to use Node 22.18.0  

### **Additional Libraries & Tools**  
All libraries are compatible with Node 22 LTS:  
- **Cloudinary SDK (latest)** – For image upload and optimization  
- **Zod (latest)** – Schema validation with TypeScript support  
- **React Query (TanStack Query) (latest)** – Client state management  
- **React Hook Form (latest)** – Form management and validation  
- **Stripe SDK (latest)** – Payment integration, Node 22 compatible  
- **SendGrid (latest)** – Email API client  

### **Development Tools**  
- **ESLint & Prettier (latest)** – Static analysis and code formatting with Node 22 support  
- **Prisma Studio** – GUI for DB management, runs on Node 22  
- **Postman / Hoppscotch** – API testing, independent tools  

---

## 1. Product Overview  

**Vision:**  
Build a modern, minimal, and functional e-commerce platform enabling sellers to list products, customers to browse, add to cart, and make secure purchases — deployable in a hackathon timeframe, running on Node.js 22.18.0 LTS runtime.

**MVP Philosophy:**  
Each iteration is a **testable, deployable product** on Node 22 environment. Later iterations **extend functionality** without breaking the working product from earlier phases.

---

## 2. Iterative MVP Development Plan  

### **PHASE 1: Foundation MVPs**  
*Core customer purchase flow on Node 22*

---

#### **ITERATION 1.1 MVP: Product Catalog + Google Sign-In**  
**Complete Working Solution:**  
Users can log in with Google and browse products, all on Node 22.  

**Technical Implementation Highlights:**  
- Node 22 LTS runtime environment  
- Prisma client and migrations running on Node 22  
- NextAuth.js using Google OAuth provider compatible with Node 22  
- Cloudinary SDK for image upload, verified on Node 22  

---

#### **ITERATION 1.2 MVP: Shopping Cart + Checkout**  
**Complete Working Solution:**  
Users can add products to a cart and place orders without payment, using libraries fully compatible with Node 22.

---

#### **ITERATION 1.3 MVP: Payments Integration**  
**Complete Working Solution:**  
Payments via Stripe with full Node 22 support including webhooks and secure environment variables management.

---

### **PHASE 2: Enhancements & Seller Tools**  

---

#### **ITERATION 2.1 MVP: Seller Dashboard**  
Built on stable Node 22 environment with role-based API access.

---

#### **ITERATION 2.2 MVP: Product Reviews & Ratings**  
Schema validation and API endpoints powered by Zod and Prisma on Node 22.

---

#### **ITERATION 2.3 MVP: Order Tracking**  
Email notifications via SendGrid SDK supporting Node 22.

---

## 3. Technical Architecture Requirements  

### **Core System**  
- Next.js 14 App Router running on Node.js 22.18.0 LTS  
- Prisma ORM with Neon PostgreSQL, Node 22 compatible  
- NextAuth.js Google OAuth with Node 22 support  
- Stripe payments and webhook processing with Node 22  
- Cloudinary image handling SDK on Node 22  

### **Database Models**  
(Same as original, no changes required)

### **API & Integrations**  
- Next.js API routes optimized for Node 22  
- Stripe webhooks using Node 22 async/await  
- SendGrid email service Node 22 compatible SDK  
- Cloudinary SDK integration  

### **Frontend**  
- React 18 with hooks  
- Tailwind CSS + shadcn/ui  
- React Query for API state management  
- React Hook Form + Zod validation  

### **Deployment**  
- Vercel hosting configured for Node 22 runtime  
- GitHub CI/CD pipeline specifying Node 22.18.0 as runtime  

---

## 4. Success Metrics Per Iteration  

| Iteration | Success Criteria (Node 22 compatible) |
|-----------|------------------|
| 1.1 | User login works, products display, admin can add products on Node 22 |
| 1.2 | Cart persists, checkout works, orders created on Node 22 |
| 1.3 | Payments processed, orders updated after payment on Node 22 |
| 2.1 | Sellers manage their own products & view orders on Node 22 |
| 2.2 | Reviews functional with average ratings on Node 22 |
| 2.3 | Order tracking live with email notifications on Node 22 |

---

## 5. Development Notes  
- **Use Node.js 22.18.0 LTS for all local development and production deployments.**  
- Keep API endpoints **minimal, asynchronous, and leverage modern Node 22 features (e.g., ES Modules, native async/await).**  
- Use **latest stable versions** of all dependencies compatible with Node 22.  
- Ensure **Vercel project is set to Node 22 runtime** explicitly in configuration.  
- Test **all SDKs and libraries for Node 22 compatibility** before production deployment.  
- Maintain **environment variable management and secure key handling** for Google OAuth, Stripe, and SendGrid.  

---
