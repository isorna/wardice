<template>
  <footer>
    <div>
      <button v-if="!user" @click="handleSignIn">Sign in</button>
      <div v-if="user">
        <!-- <p>Welcome, {{ user.displayName }}!</p> -->
        <button @click="handleSignOut">Sign Out</button>
      </div>
    </div>
    <SponsorMe />
  </footer>
</template>

<script setup>
import SponsorMe from '@/components/SponsorMe.vue'
import { ref, onMounted, onUnmounted } from 'vue';
import { auth, signInWithGoogle, signOutUser } from '@/firebase/auth';
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
