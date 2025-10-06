rules_version = '2';

// Por defecto, denegar todas las lecturas y escrituras.
service cloud.firestore {
  match /databases/{database}/documents {
    // Denegar el acceso a todos los documentos por defecto.
    match /{document=**} {
      allow read, write: if false;
    }

    // Permitir a CUALQUIER usuario autenticado (incluidos los anónimos)
    // crear un documento en la colección 'guests'. La operación 'create'
    // se dirige a la colección, por lo que la regla debe estar en el path
    // de la colección. También se permite la lectura para futuras funciones.
    match /guests/{guestId} {
      allow create, read: if request.auth != null;
    }
  }
}
