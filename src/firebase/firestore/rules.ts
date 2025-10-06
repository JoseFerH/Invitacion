rules_version = '2';

// By default, deny all reads and writes.
service cloud.firestore {
  match /databases/{database}/documents {
    // Deny all access to all documents by default
    match /{document=**} {
      allow read, write: if false;
    }

    // This rule allows any authenticated user (including anonymous users)
    // to create a document in the 'guests' collection. The 'create' operation
    // targets the collection itself, so the rule must be on the collection path.
    // We also explicitly allow reads for potential future features.
    match /guests/{guestId} {
      allow create, read: if request.auth != null;
    }
  }
}
