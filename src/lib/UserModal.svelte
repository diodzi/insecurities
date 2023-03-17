<script>
  import { openUserModal, logOut, userEmail } from './firebase'
  import Modal from './Modal.svelte'
</script>

<main>
  <Modal>
    {$userEmail}
    <button on:click={logOut}>log out</button>
    <button on:click={() => openUserModal.set(false)}>close</button>
  </Modal>
</main>

<style>
  button {
    border: 0.2rem solid black;
  }
</style>
