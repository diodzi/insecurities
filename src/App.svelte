<script>
  import {
    loggedIn,
    isUploading,
    openLogInModal,
    openUserModal,
  } from './lib/firebase'
  import LogIn from './lib/LogIn.svelte'

  import Feed from './lib/Feed.svelte'
  import UploadModal from './lib/UploadModal.svelte'
  import UserModal from './lib/UserModal.svelte'

  function handleUserBtn() {
    if ($loggedIn) {
      openUserModal.set(true)
    } else {
      openLogInModal.set(true)
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg
  on:click={handleUserBtn}
  id="menu"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="w-6 h-6"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  />
</svg>

<main>
  <header>
    <div id="title">the dump</div>
    a diodzi project
  </header>

  <section id="upload-section">
    <button on:click={() => isUploading.set(true)}>upload</button>

    {#if $isUploading}
      <UploadModal />
    {/if}
  </section>

  {#if $openLogInModal}
    <LogIn />
  {/if}

  {#if $openUserModal}
    <UserModal />
  {/if}

  <Feed />
</main>

<style>
  #title {
    font-size: 5rem;
    margin-top: 2rem;
    font-weight: bold;
  }

  #menu {
    position: fixed;
    right: 0;
    max-width: 2.5rem;
    cursor: pointer;
    background-color: #baffe1;
    border: 0.2rem solid white;
  }

  #upload-section {
    margin-bottom: 3rem;
  }

  header {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media only screen and (max-width: 480px) {
    #title {
      font-size: 3.5rem;
    }
  }

  main {
    margin-bottom: 5rem;
  }
</style>
