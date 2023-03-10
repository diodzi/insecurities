<script>
  export let title = ''
  export let imageRef = ''
  export let likes = 0
  export let dislikes = 0
  export let account = ''
</script>

<main>
  <span id='title'><span id='user'>{account.substring(0, account.indexOf('@'))}</span>/{title}</span>
  <img src={imageRef} alt="post" />
  likes: {likes}
  dislikes: {dislikes}
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
