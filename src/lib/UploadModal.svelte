<script>
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
  import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
  import { db, storage, auth } from './firebase'

  let fileToUpload

  async function uploadPic() {
    const pic = fileToUpload.files[0]
    const storageLocation = ref(
      storage,
      `${auth.currentUser.email}/${pic.name}`
    )

    uploadBytes(storageLocation, pic)
      .then((snapshot) => {
        console.log('storage upload successful')
        getDownloadURL(storageLocation).then((url) => {
          let fileName = pic.name
          addDoc(collection(db, 'images'), {
            title: fileName.substring(0, fileName.length - 4),
            imageRef: url,
            timestamp: serverTimestamp(),
            account: auth.currentUser.email,
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
</script>

<main>
  <label for="raw">RAW Upload</label>
  <input type="file" id="raw" bind:this={fileToUpload} />

  <button type="button" on:click={uploadPic}>upload</button>
</main>

<style>
    label {
        border: 1px solid white;
        border-radius: 10px;
        padding: 1rem;
    }
</style>
