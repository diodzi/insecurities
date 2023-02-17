<script>
  export let title = ''
  export let imageRef = ''
  export let likes = 0
  export let dislikes = 0
</script>

<main>
  <h1>{title}</h1>
  <img src={imageRef} alt="post" />
  likes: {likes}
  dislikes: {dislikes}
</main>
