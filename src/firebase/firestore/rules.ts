rules_version = '2';

// By default, deny all reads and writes.
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
    
    // Allow any authenticated user (including anonymous) to create a document in the 'guests' collection.
    // This rule now correctly allows the 'addDoc' operation used by the RSVP form.
    match /guests/{guestId} {
      allow create: if request.auth != null;
    }
  }
}
