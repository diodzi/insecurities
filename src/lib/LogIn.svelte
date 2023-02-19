<script>
  import {signInWithEmailAndPassword} from 'firebase/auth'
  import { auth } from './firebase.js'
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher

  let email
  let password

  function logIn() {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        alert('logged in')
    })
  }
</script>

<main>
    <input type="text" name="email" id="email" bind:value={email}>
    <input type="password" name="password" id="password" bind:value={password}>
    <button on:click={logIn}>log in</button>
</main>
