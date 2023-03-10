<script>
  import { db } from './firebase.js'
  
  import { collection, onSnapshot } from 'firebase/firestore'
  import Post from './Post.svelte'
  import UploadModal from './UploadModal.svelte'

  let posts = []
  $: sortedPosts = posts.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)


  onSnapshot(collection(db, 'images'), (snapshot) => {
    posts = []
    snapshot.forEach((post) => {
      posts = [...posts, {
        title: post.data().title,
        imageRef: post.data().imageRef,
        timestamp: post.data().timestamp,
        account: post.data().account,
      }]
    })
    console.log(posts)
  })
</script>

<UploadModal />

{#each sortedPosts as post}
  <Post title={post.title} imageRef={post.imageRef} likes={post.likes} dislikes={post.dislikes} account={post.account}/>
{/each}