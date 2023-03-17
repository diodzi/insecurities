<script>
</script>

<main>
  <div class="wrapper">
    <div class="modal">
      <slot />
    </div>
  </div>
</main>

<style>
  main {
    background-color: white;
  }

  .wrapper {
    background-color: rgba(8, 8, 8, 0.8);
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }

  .modal {
    color: black;
    background-color: white;
    border: 0.2rem solid black;
    max-width: min(20rem, 80%);
    margin: 20% auto;
    padding: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
