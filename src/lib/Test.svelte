<script>
  import { db } from './firebase.js'
  import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'

  import Post from './Post.svelte'
  import UploadModal from './UploadModal.svelte'

  let posts = []

  onSnapshot(collection(db, 'images'), async (snapshot) => {
    posts = []

    const q = query(collection(db, 'images'), orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(post => {
      posts = [...posts, {
        title: post.data().title,
        rawRef: post.data().rawRef,
        editRef: post.data().editRef,
        timestamp: post.data().timestamp,
        account: post.data().account,
      }]
    })
  })
</script>

<UploadModal />

{#each posts as post}
  <Post title={post.title} rawRef={post.rawRef} editRef={post.editRef} account={post.account}/>
{/each}