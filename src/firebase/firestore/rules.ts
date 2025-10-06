rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Default rule: Deny all reads and writes
    match /{document=**} {
      allow read, write: if false;
    }

    // Guests collection
    match /guests/{guestId} {
      // Allow a user to create their own guest document.
      // The document ID must match the user's UID.
      allow create: if request.auth != null && request.auth.uid == guestId;
      
      // Allow a user to read their own guest document.
      allow read: if request.auth != null && request.auth.uid == guestId;
    }

    // Song Suggestions subcollection
    match /guests/{guestId}/song_suggestions/{suggestionId} {
      // Allow a user to create song suggestions for themselves.
      // This rule checks that the user making the request is the owner of the guest document.
      allow create: if request.auth != null && request.auth.uid == guestId;
    }
  }
}
