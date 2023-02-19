<script>
  import { loggedIn } from './lib/firebase'
  import LogIn from './lib/LogIn.svelte';
  import { logOut } from './lib/firebase'

  import Test from './lib/Test.svelte'
  
</script>

<main>
  {#if !($loggedIn)}
    <LogIn />
  {:else}
    <Test />
  {/if}
  <button on:click={logOut}>logout</button>
</main>
