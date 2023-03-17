<script>
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from 'firebase/auth'
  import { auth, openLogInModal } from './firebase.js'
  import Modal from './Modal.svelte'

  let email
  let password
  let loggingIn

  function logIn() {
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      alert('logged in')
      openLogInModal.set(false)
    })
  }

  function signUp() {
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
      alert('thank you for signing up!')
      openLogInModal.set(false)
    })
  }
</script>

<main>
  <Modal>
    log in to start uploading :)
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
    <div class="authButtons">
      <button on:click={logIn}>log in</button>
      <button on:click={signUp}>sign up</button>
    </div>
    <button on:click={() => openLogInModal.set(false)}>cancel</button>
  </Modal>
</main>

<style>
  button {
    border: 0.2rem solid black;
  }
</style>
