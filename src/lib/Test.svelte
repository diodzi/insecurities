<script>
  import { db, storage } from './firebase.js'
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
  import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore'
  import Post from './Post.svelte'

  let projectName
  let posts = []
  $: sortedPosts = posts.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)

  async function uploadPic(e) {
    const pic = e.target.files[0]
    const storageLocation = ref(storage, `${projectName}/${pic.name}`)

    uploadBytes(storageLocation, pic)
      .then((snapshot) => {
        console.log('storage upload successful')
        getDownloadURL(storageLocation).then((url) => {
          addDoc(collection(db, 'images'), {
            title: pic.name,
            imageRef: url,
            likes: 0,
            dislikes: 0,
            timestamp: serverTimestamp()
          })
            .then(() => {
              console.log('database upload successful')
            })
            .catch((err) => {
              console.log('database upload failed')
              console.log(err)
            })
        })
      })
      .catch((err) => {
        console.log('storage upload failed')
        console.log(err)
      })
  }

  onSnapshot(collection(db, 'images'), (snapshot) => {
    posts = []
    snapshot.forEach((post) => {
      posts = [...posts, {
        title: post.data().title,
        imageRef: post.data().imageRef,
        likes: post.data().likes,
        dislikes: post.data().dislikes,
        timestamp: post.data().timestamp
      }]
    })
    console.log(posts)
  })
</script>

<input
  type="text"
  name="projectName"
  id="projectName"
  bind:value={projectName}
  placeholder="project name"
/>
<input type="file" name="picToUpload" id="picToUpload" on:change={uploadPic} />

{#each sortedPosts as post}
  <Post title={post.title} imageRef={post.imageRef} likes={post.likes} dislikes={post.dislikes}/>
{/each}