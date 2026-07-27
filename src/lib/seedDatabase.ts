import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { mockProviders, mockReviews, mockBookingHistory } from '../data';

export async function populateDatabase() {
  console.log('Starting Firestore database population...');

  try {
    // 1. Seed Providers
    for (const p of mockProviders) {
      try {
        const providerRef = doc(db, 'providers', p.id);
        await setDoc(providerRef, {
          id: p.id,
          name: p.name,
          category: p.category,
          rating: p.rating,
          totalReviews: p.reviewsCount,
          hourlyRate: p.basePrice,
          city: 'Lahore',
          verified: true,
          avatar: p.photo,
          phone: '0300-9876543',
          skills: p.skills,
          experienceYears: p.experienceYears,
          bio: p.bio,
          reliabilityScore: p.reliabilityScore
        }, { merge: true });
      } catch (err) {
        console.warn(`Provider ${p.id} seed skipped:`, err);
      }
    }

    // 2. Seed Sample User Profile
    const sampleUserId = 'user-fahad-taj';
    try {
      await setDoc(doc(db, 'users', sampleUserId), {
        uid: sampleUserId,
        displayName: 'Fahad Taj',
        email: 'ftaj1724@gmail.com',
        phone: '0300-1234567',
        role: 'customer',
        city: 'Lahore',
        address: 'House 412, Block Y, DHA Phase 3, Lahore',
        createdAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn('Sample user seed skipped:', err);
    }

    // 3. Seed Bookings
    for (const b of mockBookingHistory) {
      try {
        const bookingRef = doc(db, 'bookings', b.id);
        await setDoc(bookingRef, {
          id: b.id,
          customerId: sampleUserId,
          customerName: b.customerName || 'Fahad Taj',
          providerId: b.provider.id,
          providerName: b.provider.name,
          category: b.category,
          status: b.status === 'completed' ? 'Completed' : 'Accepted',
          amount: b.total,
          scheduledDate: b.date,
          city: 'Lahore',
          address: b.location,
          notes: b.description,
          createdAt: new Date(b.date).toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn(`Booking ${b.id} seed skipped:`, err);
      }
    }

    // 4. Seed Reviews
    for (const r of mockReviews) {
      try {
        const reviewRef = doc(db, 'reviews', r.id);
        await setDoc(reviewRef, {
          id: r.id,
          bookingId: 'b-past-1',
          customerId: sampleUserId,
          customerName: r.authorName,
          providerId: 'p1',
          rating: r.rating,
          comment: r.comment,
          createdAt: new Date(r.date).toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn(`Review ${r.id} seed skipped:`, err);
      }
    }

    console.log('Database population complete!');
    return { success: true, seededProviders: mockProviders.length, seededBookings: mockBookingHistory.length };
  } catch (globalErr) {
    console.warn('Database population notice:', globalErr);
    return { success: false, error: globalErr };
  }
}
