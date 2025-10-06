rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Deny all reads and writes by default
    match /{document=**} {
      allow read, write: if false;
    }

    // Rule for the 'guests' collection
    match /guests/{guestId} {
      // Allow any authenticated user (including anonymous) to CREATE a document.
      // This rule applies to collection-group operations like addDoc().
      allow create: if request.auth != null;
      
      // Allow reading a document, you might need this for other features.
      // For now, it's good practice to have it.
      allow read: if request.auth != null;
    }
  }
}
