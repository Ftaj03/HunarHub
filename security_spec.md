# Firebase Security Specification

## Data Invariants
1. Users can create and read their own user profile document.
2. Bookings can be created by authenticated users (as customerId) or viewed/updated by either the customer or assigned provider.
3. Providers catalog is readable by anyone signed in or anonymous, but writable by provider owners/admins.
4. Reviews can be created by authenticated customers for completed bookings and read by everyone.

## Security Rules Summary
- `users/{userId}`: Only the user or admin can read/write their own document.
- `bookings/{bookingId}`: Customer or provider on the booking can read; customer can create; customer/provider can update status.
- `providers/{providerId}`: Publicly readable; writable by the provider user.
- `reviews/{reviewId}`: Readable by all authenticated users; writable by the customer who booked the service.
