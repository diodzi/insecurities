<script>
  import { db } from './firebase.js'
  import {
    collection,
    getDocs,
    onSnapshot,
    orderBy,
    query,
  } from 'firebase/firestore'

  import Post from './Post.svelte'

  let posts = []

  onSnapshot(collection(db, 'posts'), async (snapshot) => {
    posts = []

    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((post) => {
      let timestamp = post.data().timestamp
      let date = timestamp && timestamp.toDate().toDateString()
      posts = [
        ...posts,
        {
          title: post.data().title,
          rawRef: post.data().rawRef,
          editRef: post.data().editRef,
          timestamp: date,
          account: post.data().account,
        },
      ]
    })
  })
</script>

<main>
  {#each posts as post}
    <Post
      title={post.title}
      rawRef={post.rawRef}
      editRef={post.editRef}
      account={post.account}
      timestamp={post.timestamp}
    />
  {/each}
</main>

<style>
  main {
    gap: 1rem;
  }
</style>
