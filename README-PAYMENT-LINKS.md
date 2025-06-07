# Payment Link Integration Guide

This document outlines the implementation of payment link functionality in the frontend application, providing both simple and advanced payment processing capabilities.

## Overview

The application now supports two modes of payment link management:

1. **Simple Payment Links** - Aligned with the integration document standards
2. **Advanced Payment Links** - Complex escrow functionality with services, deals, and verification

## Architecture

### API Layer (`app/dashboard/payment-link/api.ts`)

The API layer provides two sets of functions:

#### Simple Payment Link Functions

- `useCreateSimplePaymentLink()` - Create basic payment links
- `useGetSimplePaymentLinks()` - Retrieve all payment links
- `useGetPublicPaymentLink()` - Get public payment link details
- `useUpdateSimplePaymentLink()` - Update payment link details
- `useDeletePaymentLink()` - Delete payment links
- `useInitializePayment()` - Initialize payment process
- `useConfirmPayment()` - Confirm payment completion

#### Advanced Payment Link Functions

- `useCreatePaymentLink()` - Create complex payment links with escrow
- `usePaymentLinks()` - Get advanced payment links
- `useInitiateTransaction()` - Start escrow transactions
- `useUpdateVerification()` - Handle verification processes

### Component Layer

#### Forms

- `SimpleCreatePaymentLinkForm` - Basic payment link creation
- `CreatePaymentLinkForm` - Advanced payment link creation with escrow

#### Lists

- `SimplePaymentLinksList` - Basic payment link management
- `PaymentLinksList` - Advanced payment link management

#### Payment Processing

- `SimplePaymentForm` - Basic payment processing flow
- `PaymentPageContent` - Advanced payment processing with escrow

## Simple Payment Links (Integration Document Aligned)

### Creating a Payment Link

```typescript
const createPaymentLink = useCreateSimplePaymentLink();

const handleCreate = async () => {
  try {
    const response = await createPaymentLink.mutateAsync({
      name: "Payment for Design Services",
      amount: 100.0,
      currency: "USD",
    });

    console.log("Payment link created:", response.link);
  } catch (error) {
    console.error("Creation failed:", error);
  }
};
```

### Supported Currencies

- USD (United States Dollar)
- GBP (British Pound)
- EUR (Euro)
- NGN (Nigerian Naira)
- USDC (USD Coin)
- USDT (Tether)
- ESPEES (Platform token)

### Public Payment Flow

The public payment flow follows these steps:

1. **Customer Details** - Collect name and email
2. **Payment Method Selection** - Choose between card or crypto
3. **Payment Confirmation** - Process and confirm payment

```typescript
// Initialize payment
const initializePayment = useInitializePayment();
const response = await initializePayment.mutateAsync({
  linkId: "lnk_123456789",
  data: {
    customerEmail: "customer@example.com",
    customerName: "Jane Smith",
  },
});

// Confirm payment
const confirmPayment = useConfirmPayment();
await confirmPayment.mutateAsync({
  linkId: "lnk_123456789",
  data: {
    transactionId: response.transactionId,
    paymentIntentId: "pi_stripe_payment_intent_id",
    reference: "payment_ref_123",
  },
});
```

## Advanced Payment Links (Escrow Functionality)

The advanced implementation supports:

- **Cryptocurrency transactions** with blockchain verification
- **Service contracts** with proof requirements
- **Complex deals** with multiple stages and parties
- **Escrow management** with automated release conditions

### Transaction Types

1. **CRYPTOCURRENCY** - Direct crypto payments with blockchain confirmation
2. **SERVICES** - Service delivery with proof submission
3. **DEALS** - Multi-stage transactions with milestone payments

## Usage Instructions

### Dashboard Access

1. Navigate to `/dashboard/payment-link`
2. Use the toggle switch to choose between Simple and Advanced modes
3. Click "Create New Link" to start creating payment links

### Simple Mode Features

- **Basic form** with name, amount, and currency
- **Clean list view** with copy/share functionality
- **Quick actions** for edit/delete operations
- **Currency formatting** and validation

### Advanced Mode Features

- **Complex forms** with transaction type selection
- **Service details** and contract terms
- **Deal stages** and milestone management
- **Verification methods** and escrow conditions

## Testing the Implementation

### 1. Create a Simple Payment Link

```bash
# Navigate to the dashboard
http://localhost:3000/dashboard/payment-link

# Toggle to "Simple Mode"
# Fill out the form:
# - Name: "Test Payment"
# - Amount: 50.00
# - Currency: USD
# Click "Create Link"
```

### 2. Test Public Payment Flow

```bash
# Copy the generated payment link URL
# Open in a new browser window/incognito mode
# Fill customer details and process payment
```

### 3. Test API Endpoints (if backend is available)

```bash
# Authentication
curl -X POST "YOUR_API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "merchant@example.com", "password": "password"}'

# Create payment link
curl -X POST "YOUR_API_URL/payment-links" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name": "Test Payment", "amount": 50.00, "currency": "USD"}'

# Get payment link (public)
curl -X GET "YOUR_API_URL/payment-links/LINK_ID"
```

## Error Handling

The implementation includes comprehensive error handling:

### Form Validation

- Required field validation
- Amount minimum validation (0.01)
- Currency selection validation
- Email format validation

### API Error Handling

- Network failure handling
- Authentication error handling
- Validation error display
- User-friendly error messages

### Loading States

- Form submission loading indicators
- List loading states
- Payment processing indicators

## Security Considerations

### Frontend Security

- JWT token management with localStorage
- Input validation and sanitization
- CSRF protection considerations
- Secure payment processor integration

### Payment Security

- No sensitive payment data stored in frontend
- Secure token-based payment processing
- HTTPS-only communication
- Payment processor SDK integration

## File Structure

```
app/
├── dashboard/payment-link/
│   ├── api.ts                 # API functions and types
│   └── page.tsx              # Dashboard page with mode toggle
├── components/
│   ├── CreatePaymentLinkForm.tsx  # Form components
│   └── PaymentLinkList.tsx        # List components
└── pay/[id]/
    └── page.tsx              # Public payment pages
```

## Integration with Backend

The frontend is designed to work with API endpoints that follow the integration document specifications:

### Required Endpoints

- `POST /payment-links` - Create payment link
- `GET /payment-links` - List payment links (authenticated)
- `GET /payment-links/{id}` - Get payment link details (public)
- `PATCH /payment-links/{id}` - Update payment link
- `DELETE /payment-links/{id}` - Delete payment link
- `POST /payment-links/{id}/initialize` - Initialize payment
- `POST /payment-links/{id}/confirm` - Confirm payment
- `GET /payment-links/transactions/{id}` - Get transaction details

### Authentication

All merchant operations require JWT authentication:

```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

## Performance Optimization

### Frontend Performance

- React Query for caching and state management
- Lazy loading for payment forms
- Optimized re-renders with proper dependency arrays
- Efficient list rendering with React keys

### Bundle Optimization

- Component code splitting
- Dynamic imports for heavy features
- Tree shaking for unused exports
- Optimized asset loading

## Future Enhancements

### Planned Features

- Bulk payment link creation
- Payment analytics dashboard
- Email notification templates
- Webhook endpoint management
- Multi-language support
- Mobile app integration

### Advanced Integrations

- Stripe payment processor integration
- Blockchain wallet connections
- Real-time payment status updates
- Advanced reporting and analytics

## Troubleshooting

### Common Issues

1. **Payment link not loading**

   - Check if the link ID is valid
   - Verify API endpoint availability
   - Check network connectivity

2. **Form validation errors**

   - Ensure all required fields are filled
   - Check amount is at least 0.01
   - Verify currency is supported

3. **Payment processing fails**
   - Check payment processor configuration
   - Verify customer data is complete
   - Check API endpoint responses

### Debug Mode

Enable debug mode by setting environment variables:

```bash
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_API_URL=http://localhost:10000
```

## Support

For technical support and questions:

- Check the integration document for API specifications
- Review error logs in browser console
- Test API endpoints independently
- Verify authentication tokens are valid

---

This implementation provides a comprehensive payment link solution that can be used in both simple scenarios (following the integration document) and complex escrow-based transactions. The modular design allows for easy extension and customization based on specific business requirements.
