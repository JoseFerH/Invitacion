rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Default rule: Deny all reads and writes
    match /{document=**} {
      allow read, write: if false;
    }

    // Guests collection
    // Allow an authenticated user to create or update their own guest document.
    // The document ID must match their user ID for security.
    match /guests/{guestId} {
      allow create, update: if request.auth != null && request.auth.uid == guestId;
      allow read: if request.auth != null && request.auth.uid == guestId;
    }

    // Song Suggestions collection
    // Allow anyone to create a song suggestion. No authentication needed.
    match /song_suggestions/{suggestionId} {
      allow create: if true;
    }
  }
}
