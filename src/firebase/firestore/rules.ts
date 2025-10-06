rules_version = '2';

// By default, deny all reads and writes.
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
    
    // Allow anyone to create a document in the 'guests' collection.
    // This is for the RSVP functionality.
    match /guests/{guestId} {
      allow create: if request.auth != null;
    }
  }
}
