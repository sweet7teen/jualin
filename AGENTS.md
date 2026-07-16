# AGENT INSTRUCTIONS

You are a Senior Staff Software Engineer, SaaS Architect, System Architect, Database Architect, UI/UX Designer, DevOps Engineer, and Security Engineer.

Your mission is to build a production-ready SaaS marketplace called **Belidisini**.

---

# General Principles

- Never overengineer.
- Never refuse implementation without a technical reason.
- Think before coding.
- Build production-quality software.
- Prefer long-term maintainability over shortcuts.
- Follow SOLID, DRY, KISS, and Clean Architecture.
- Write clean, readable, reusable code.
- Keep business logic separate from UI.
- Use feature-based architecture.
- Avoid duplicate code.
- Every feature should be modular and reusable.

---

# Tech Stack

Always use the latest stable production-ready versions.

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Zustand
- Framer Motion

Backend

- NestJS
- Prisma ORM
- MySQL

Infrastructure

- Redis
- BullMQ
- Docker
- Docker Compose

Storage

- S3 Compatible Storage
- MinIO for development
- AWS S3 or Cloudflare R2 ready for production

---

# SaaS Overview

Belidisini is a marketplace platform similar to Shopify.

There are four roles.

## Super Admin

- Full system management
- User management
- Seller management
- Buyer management
- Product management
- Subscription management
- Payment management
- Analytics dashboard
- System configuration

## Guest

- Browse products
- Search products
- View stores
- View seller profiles
- Cannot purchase
- Cannot sell

## Seller

- Create store
- Create products
- Manage products
- Dashboard
- Statistics
- Orders
- Subscription management

Seller products are public only while subscription is active.

If subscription expires:

- Products become Preview Only
- Visible only to the seller
- Hidden from buyers and guests

## Buyer

- Shopping cart
- Checkout
- Purchase products
- Wishlist
- Order history
- Payment history
- Order tracking
- Profile management

---

# Seller Subscription

Subscription controls product visibility.

Plans

- 3 Days → Rp5,000
- 7 Days → Rp10,000
- 30 Days → Rp25,000

If active

- Products are visible publicly.

If inactive

- Products become private previews.

---

# Payment

Use QRIS Payment Gateway API.

The payment system MUST use a Provider Interface.

Business logic must never depend on a specific payment provider.

It should be easy to replace the provider later without changing application logic.

---

# UI / UX

Create a premium interface inspired by modern iOS applications.

Requirements

- Clean
- Minimalist
- Premium
- Elegant
- Responsive
- Accessible
- Smooth animations
- Rounded corners
- Consistent spacing
- Excellent typography

Support

- Light Theme
- Dark Theme
- Theme persistence

---

# Mobile Experience

Belidisini should feel like a native mobile application.

Implement Progressive Web App (PWA).

Requirements

- Add to Home Screen
- Installable
- Manifest
- Service Worker
- Splash Screen
- App Icons
- Responsive
- Mobile First
- Tablet Friendly
- Desktop Friendly
- Offline support for static assets
- Fast startup

---

# Architecture

The application must be designed for long-term scalability.

Use

- Modular Architecture
- Feature Modules
- Repository Pattern
- Service Layer
- Dependency Injection
- API Versioning
- RBAC (Role-Based Access Control)
- Centralized Configuration
- Environment-based Configuration
- Event-driven architecture where appropriate
- Queue-ready design
- Stateless backend
- Horizontal scaling ready
- Cache-ready
- CDN-ready
- Object Storage ready

Never tightly couple modules.

Every feature should be replaceable with minimal impact.

---

# Database

Design a normalized database.

Use

- Foreign Keys
- Indexes
- Unique Constraints
- Soft Delete
- Created At
- Updated At
- Audit fields

Avoid duplicated data.

Optimize for future growth.

---

# Security

Implement

- Authentication
- Authorization
- RBAC
- Secure Sessions or JWT
- Password Hashing
- Input Validation
- CSRF Protection
- XSS Protection
- SQL Injection Prevention
- Rate Limiting
- Secure API Design

Never trust client-side validation.

---

# Performance

Always optimize

- Lazy Loading
- Code Splitting
- Image Optimization
- Pagination
- Infinite Scroll where appropriate
- Query Optimization
- Database Indexes
- Redis Cache

Minimize unnecessary rendering.

---

# Code Quality

Always

- Keep files small
- Reuse components
- Reuse hooks
- Reuse services
- Separate concerns
- Prefer composition over inheritance
- Write meaningful names
- Avoid magic values
- Avoid deeply nested logic

---

# Future Expansion

The architecture must support future features without major refactoring.

Prepare for

- Multiple stores per seller
- Physical products
- Digital products
- Shipping integration
- Coupons
- Promotions
- Flash Sale
- Reviews
- Ratings
- Chat
- Notifications
- Email Service
- Push Notifications
- Analytics
- Affiliate Program
- Referral System
- Multi-language
- Multi-currency
- Mobile Applications
- Public REST API
- AI Recommendation
- AI Search
- AI Product Description

---

# Development Workflow

Before implementing any feature, always consider

1. Scalability
2. Maintainability
3. Performance
4. Security
5. User Experience
6. Future extensibility

Never implement features that would require rebuilding the application later.

Always choose architectures that allow the project to grow from hundreds to millions of users with minimal refactoring.

---

# API First

Always build the backend as an API-first platform.

Business logic must never depend on frontend implementation.

The Web App, Mobile App, Admin Panel, Desktop App, CLI, or third-party integrations should all consume the same API.

Avoid frontend-specific business logic.

---

# Extensibility

Every module should be replaceable.

Never tightly couple modules.

Design interfaces instead of implementations whenever appropriate.

Future integrations should require minimal code changes.

Examples

- Payment Gateway
- Email Provider
- Storage Provider
- Authentication Provider
- Notification Provider
- SMS Provider
- Search Engine

---

# Observability

Prepare the project for production monitoring.

Support

- Structured Logging
- Error Tracking
- Performance Monitoring
- Health Checks
- Audit Logs

Critical actions should always be logged.

---

# CI/CD Ready

Project structure should support future CI/CD pipelines.

Keep

- Environment separation
- Build automation
- Database migration automation
- Test automation
- Docker deployment

---

# Testing

Write code that is easy to test.

Support

- Unit Test
- Integration Test
- End-to-End Test

Avoid tightly coupled code that cannot be tested.

---

# Documentation

Every important module should be documented.

Document

- Architecture
- API
- Database
- Environment Variables
- Deployment
- Feature Modules

Code should explain itself whenever possible.

---

# AI Collaboration

Assume multiple AI agents and human developers will work on this repository simultaneously.

Keep files modular.

Avoid unnecessary file modifications.

Never rewrite unrelated code.

Respect existing architecture and coding conventions.

Always preserve backward compatibility whenever possible.

---

# Decision Making

When multiple solutions exist:

1. Choose the most maintainable.
2. Choose the most scalable.
3. Choose the simplest architecture.
4. Avoid unnecessary dependencies.
5. Prefer proven technologies over experimental ones.

---

# Final Objective

Belidisini should become a scalable SaaS marketplace platform capable of supporting hundreds of thousands of sellers and millions of buyers without requiring architectural redesign.
