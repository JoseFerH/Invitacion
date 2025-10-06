rules_version = '2';

// By default, deny all reads and writes.
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
    
    // Allow any authenticated user (including anonymous) to create a document in the 'guests' collection.
    // The 'create' operation targets the collection, so the rule should match the collection path.
    match /guests/{guestId} {
      allow create: if request.auth != null;
    }
  }
}
