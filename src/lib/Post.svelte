<script>
  export let title = ''
  export let rawRef = ''
  export let editRef = ''
  export let account = ''

  let display = rawRef

  function displayRAW() {
    console.log('raw: ' + rawRef)
    display = rawRef
  }

  function displayEDIT() {
    console.log(editRef)
    display = editRef
  }
</script>

<main>
  <span id="title"
    ><span id="user">{account.substring(0, account.indexOf('@'))}</span
    >/{title}</span
  >
  <img src={display} alt="post" />
  <div id="buttons">
    <button on:click={displayRAW}>RAW</button>
    <button on:click={displayEDIT}>EDIT</button>
  </div>
</main>

<style>
  main {
    max-width: min(40rem, 80%);
    display: block;
    place-items: left;
  }

  #title {
    font-weight: 1.5rem;
    font-size: 2.5rem;
  }

  #user {
    font-size: 1.5rem;
  }

  img {
    max-width: 100%;
    border: 0.2rem solid white;
  }
</style>
