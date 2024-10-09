# E-Commerce Application README

## Table of Contents
- [Overview](#overview)
- [User Flows](#user-flows)
  - [Path 1: New User](#path-1-new-user)
  - [Path 2: Existing User](#path-2-existing-user)
  - [Merged Paths](#merged-paths)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [Contributing](#contributing)
- [License](#license)

## Overview
This README describes the user journey in the e-commerce application, covering both new and existing users as they navigate through the sign-up and sign-in processes, browse products, and complete their purchases.

## User Flows

### Path 1: New User
1. **Sign Up**: User clicks the "Sign Up" button.
2. **Email & Password Entry**: User enters their email address and creates a password.
3. **Optional Information**: User may fill in additional information, such as name and phone number.
4. **Create Account**: User clicks the "Create Account" button.
   - **Validation**: The system validates the provided information and creates a new account.
5. **Homepage Redirection**: Upon successful account creation, the user is directed to the homepage and is now logged in.

### Path 2: Existing User
1. **Sign In**: User clicks the "Sign In" button.
2. **Credentials Entry**: User enters their email address and password.
3. **Sign In Action**: User clicks the "Sign In" button.
   - **Validation**: The system validates the provided credentials and logs the user in.
4. **Homepage Redirection**: Upon successful login, the user is directed to the homepage and is now logged in.

### Merged Paths
1. **Product Browsing**: User browses products using a search bar, categories, or recommendations.
2. **Product Details**: User views a product details page, which includes the product description, images, and price.
3. **Selection**: User selects the desired quantity and size (if applicable).
4. **Add to Cart**: User clicks the "Add to Cart" button.
   - **Confirmation**: The system adds the selected item to the cart and displays a confirmation message.
5. **Options After Adding to Cart**:
   - User can click "Go to Cart" to proceed to checkout.
   - User can continue browsing products, looping back to step 1 of product browsing.
6. **Cart Review**: On the Cart Page, the user reviews the items in their cart, checking quantity and price.
7. **Delivery Address**: User selects a preferred delivery address from saved addresses or enters a new one.
8. **Payment Method**: User selects a preferred payment method (saved card, new card, net banking, etc.).
   - The system may prompt for additional information based on the chosen payment method.
9. **Order Summary Review**: User reviews the order summary, which includes items, total price, delivery address, and payment method.
10. **Place Order**: User clicks the "Place Your Order" button.
    - **Order Processing**: The system verifies the payment and processes the order.
11. **Order Confirmation**: User receives an order confirmation, which includes details such as order ID and estimated delivery date.

## Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ecommerce-app.git
   cd ecommerce-app
