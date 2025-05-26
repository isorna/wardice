# Implementing Firebase Google OAuth for Wardice

## Introduction

This document details the plan, implementation steps, and testing procedures for integrating Firebase Google OAuth into the Wardice application. Its purpose is to serve as a comprehensive guide for developers working on this feature and as documentation for the implemented solution.

## 1. Setting up Firebase for Google OAuth

- **Create and Configure Firebase Project in Console:**
  - Go to the [Firebase console](https://console.firebase.google.com/).
  - Click on "Add project" and follow the on-screen instructions to create a new project.
  - Once the project is created, navigate to "Authentication" in the left-hand menu.
  - Go to the "Sign-in method" tab.
  - Click on "Google" in the list of providers and enable it.
  - You may need to configure the OAuth consent screen and provide a support email.
  - Web SDK configuration:
    - Go to "Project settings" (click the gear icon next to "Project Overview").
    - In the "Your apps" section, click on the web icon (`</>`) to add a web app.
    - Register your app, and Firebase will provide you with a configuration object (apiKey, authDomain, etc.). You will need this for initializing Firebase in your application.
- Create a Firebase project in the Firebase console.
- Enable Google Sign-In as an authentication provider in the Firebase project.
- Add the Firebase SDK to this project. This might involve installing it via npm or yarn, depending on the project setup. (Verified: Firebase is already a dependency).

## 2. Implementing Google OAuth in `src/firebase/auth.js`

- **Created `src/firebase/auth.js`:** This file encapsulates all Firebase Authentication logic.
- **Firebase Initialization:** Firebase is initialized within `src/firebase/auth.js`.

  ```javascript
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

  // Your web app's Firebase configuration
  // IMPORTANT: Replace with your actual Firebase project configuration!
  // This configuration is obtained from your Firebase project settings.
  // For security, consider using Firebase Environment Configuration for these details.
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID" // Optional
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  ```

  *Note: The `firebaseConfig` object should be populated with your actual Firebase project credentials. It's crucial to keep these credentials secure, potentially using environment variables or Firebase's recommended methods for handling them in a production environment.*

- **`signInWithGoogle` Function:**
  - Creates an instance of `GoogleAuthProvider`.
  - Uses `signInWithPopup` to initiate the Google sign-in flow.
  - Logs the user object upon successful authentication or the error if sign-in fails.

    ```javascript
    export const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed in: ", user);
        // Additional user info and Google Access Token can be accessed here.
      } catch (error) {
        console.error("Error signing in with Google: ", error.code, error.message);
      }
    };
    ```

- **`signOutUser` Function:**
  - Calls `signOut(auth)` to sign the current user out.
  - Logs a success message or the error if sign-out fails.

    ```javascript
    export const signOutUser = async () => {
      try {
        await signOut(auth);
        console.log("User signed out successfully.");
      } catch (error) {
        console.error("Error signing out: ", error);
      }
    };
    ```

- **`onAuthStateChanged` Observer:**
  - Listens for changes in the user's authentication state.
  - Logs the user's UID when they are signed in and a message when they are signed out. This is useful for updating the UI or application state based on the user's login status.

    ```javascript
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in. UID:", user.uid);
      } else {
        console.log("User is signed out.");
      }
    });
    ```

- The core logic for Google OAuth (sign-in, sign-out, auth state observation) is encapsulated in `src/firebase/auth.js`.
- **UI Integration Note:** For a real application, you would need to create UI elements (e.g., "Sign in with Google" button, "Sign Out" button, display for user status) and connect them to the `signInWithGoogle` and `signOutUser` functions from `src/firebase/auth.js`. The application state (e.g., in Pinia store) should also react to changes detected by `onAuthStateChanged` to update the UI accordingly (e.g., showing user-specific content or redirecting to a login page).

- **Example Usage (Hypothetical Vue Component):**

    ```javascript
    <template>
      <div>
        <button v-if="!user" @click="handleSignIn">Sign in with Google</button>
        <div v-if="user">
          <p>Welcome, {{ user.displayName }}!</p>
          <button @click="handleSignOut">Sign Out</button>
        </div>
      </div>
    </template>

    <script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import { auth, signInWithGoogle, signOutUser } from '@/firebase/auth'; // Adjust path as needed
    import { onAuthStateChanged } from 'firebase/auth';

    const user = ref(null);
    let unsubscribe; // To store the unsubscribe function for onAuthStateChanged

    const handleSignIn = async () => {
      await signInWithGoogle();
      // onAuthStateChanged will update the user ref
    };

    const handleSignOut = async () => {
      await signOutUser();
      // onAuthStateChanged will update the user ref
    };

    onMounted(() => {
      // Set up the observer when the component is mounted
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
      });
    });

    onUnmounted(() => {
      // Clean up the observer when the component is unmounted
      if (unsubscribe) {
        unsubscribe();
      }
    });
    </script>
    ```

- **Example Usage (Plain JavaScript):**

    ```javascript
    import { auth, signInWithGoogle, signOutUser } from './firebase/auth.js'; // Adjust path as needed
    import { onAuthStateChanged } from 'firebase/auth';

    // Get references to your UI elements
    const signInButton = document.getElementById('signInButton');
    const signOutButton = document.getElementById('signOutButton');
    const userStatusElement = document.getElementById('userStatus');

    // Ensure these elements exist before adding event listeners
    if (signInButton) {
      signInButton.addEventListener('click', async () => {
        await signInWithGoogle();
      });
    }

    if (signOutButton) {
      signOutButton.addEventListener('click', async () => {
        await signOutUser();
      });
    }

    // Ensure the status element exists
    if (userStatusElement) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userStatusElement.textContent = `Signed in as ${user.displayName} (UID: ${user.uid})`;
          if (signInButton) signInButton.style.display = 'none';
          if (signOutButton) signOutButton.style.display = 'block';
        } else {
          userStatusElement.textContent = 'Signed out.';
          if (signInButton) signInButton.style.display = 'block';
          if (signOutButton) signOutButton.style.display = 'none';
        }
      });
    }
    ```

## 3. Testing Google OAuth Manually

**Prerequisites:**

- Ensure the Firebase project is correctly set up in the Firebase console, with Google Sign-In enabled.
- Ensure the `firebaseConfig` in `src/firebase/auth.js` is correctly populated with your project's credentials.
- Ensure the application is running locally (`npm run dev` or similar) or deployed to a test environment.
- Have a valid Google account for testing.

**Test Cases:**

- **Sign-In:**
  - Trigger the `signInWithGoogle` function (e.g., by clicking a "Sign in with Google" button integrated into the UI).
  - Verify that the Google Sign-In popup appears.
  - Select a Google account and sign in.
  - Verify that the `onAuthStateChanged` observer in `src/firebase/auth.js` logs the user's UID to the console.
  - Verify that any UI elements meant to display user status update accordingly (e.g., show "Signed in as [User Name]", hide sign-in button, show sign-out button).
  - Check the browser's console for any errors.
- **Sign-Out:**
  - Trigger the `signOutUser` function (e.g., by clicking a "Sign Out" button).
  - Verify that the `onAuthStateChanged` observer indicates the user has signed out (e.g., logs "User is signed out.").
  - Verify that UI elements update to reflect the signed-out state (e.g., show sign-in button, hide sign-out button).
  - Check the browser's console for any errors.
- **Account Exists with Different Credential:**
  - This error (`auth/account-exists-with-different-credential`) occurs if a user tries to sign in with Google using an email that is already associated with an account created via a different method (e.g., email/password).
  - If other authentication methods are implemented, attempt to create an account with an email and password, then try to sign in with Google using the same email.
  - Verify that the error is caught and logged in the console (as per the current implementation in `src/firebase/auth.js`).
  - *Further step: Implement user-friendly handling for this error, guiding the user to link accounts.*
- **Persistence:**
  - After signing in, refresh the page.
  - Verify that the user remains signed in (due to Firebase's default auth state persistence). The `onAuthStateChanged` observer should fire shortly after page load, indicating the signed-in state.
- **Multiple Browsers/Devices (Optional but Recommended):**
  - If possible, test the sign-in/sign-out flow on different browsers (Chrome, Firefox, Safari) and devices (desktop, mobile) to ensure compatibility and consistent user experience.

**Expected Outcomes:**

- Successful sign-in and sign-out functionality.
- User information (e.g., UID, display name) is accessible after sign-in.
- Basic error scenarios are logged to the console.
- Auth state persistence correctly maintains user session across page refreshes.

## 4. Conclusion and Next Steps

The core Firebase Google OAuth functionality has been implemented in `src/firebase/auth.js`, providing methods for sign-in, sign-out, and observing authentication state. The setup and manual testing procedures are documented above.

**Next Steps:**

- **UI Integration:**
  - Integrate the `signInWithGoogle` and `signOutUser` functions with actual UI elements (buttons, user status display) in the Vue components.
  - Use the `onAuthStateChanged` observer to dynamically update the application's state and UI based on the user's authentication status (e.g., using a Pinia store).
- **Firebase Configuration Management:**
  - Move the `firebaseConfig` object from `src/firebase/auth.js` to a more secure and environment-specific configuration method (e.g., environment variables, Firebase Hosting reserved URLs).
- **Advanced Error Handling:**
  - Implement more user-friendly error handling for scenarios like `auth/account-exists-with-different-credential`, potentially guiding users to link accounts.
  - Handle other potential OAuth errors gracefully.
- **Backend Integration (If Applicable):**
  - If user data needs to be stored or managed on a custom backend, implement logic to send the Firebase ID token to the backend for verification and user session management.
- **Automated Testing:**
  - Write unit tests for the authentication functions in `src/firebase/auth.js`.
  - Consider end-to-end tests for the complete sign-in/sign-out flow.

This document should be updated as the implementation evolves and new features related to authentication are added.
