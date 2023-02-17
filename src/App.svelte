<script>
  import { auth } from './lib/firebase'
  import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth'
  
  import Test from './lib/Test.svelte'

  let email
  let password
  let loggedIn

  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedIn = true
      console.log('logged in')
    } else {
      loggedIn = false
    }
  })

  function logIn() {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      loggedIn = true
    })
  }

  function logOut() {
    signOut(auth).then(() => {
      loggedIn = false
    })
  }
</script>

<main>
  {#if !loggedIn}
    <input
      type="text"
      name="email"
      id="email"
      bind:value={email}
      placeholder="email"
    />
    <input
      type="password"
      name="password"
      id="password"
      bind:value={password}
      placeholder="password"
    />
    <button on:click={logIn}>submit</button>
  {:else}
    <Test />
  {/if}
  <button on:click={logOut}>logout</button>
</main>
