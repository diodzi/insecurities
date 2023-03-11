<script>
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
  import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
  import { db, storage, auth } from './firebase'

  let rawFileToUpload
  let editFileToUpload

  async function uploadSet() {
    try {
      const rawPic = rawFileToUpload.files[0]

      const rawStorageLocation = ref(
        storage,
        `${auth.currentUser.email}/${rawPic.name}`
      )

      const editPic = editFileToUpload.files[0]

      const editStorageLocation = ref(
        storage,
        `${auth.currentUser.email}/${editPic.name}`
      )

      await uploadBytes(rawStorageLocation, rawPic)
      const rawUrl = await getDownloadURL(rawStorageLocation)
      await uploadBytes(editStorageLocation, editPic)
      const editUrl = await getDownloadURL(editStorageLocation)

      addDoc(collection(db, 'images'), {
        title: rawPic.name.substring(0, rawPic.name.length - 4),
        rawRef: rawUrl,
        editRef: editUrl,
        timestamp: serverTimestamp(),
        account: auth.currentUser.email,
      })
    } catch(err) {
      alert('error uploading: ' + err)
    }
  }
</script>

<main>
  <label for="raw">RAW Upload</label>
  <input type="file" id="raw" bind:this={rawFileToUpload} />

  <label for="edit">EDIT Upload</label>
  <input type="file" id="edit" bind:this={editFileToUpload} />

  <button type="button" on:click={uploadSet}>upload</button>
</main>

<style>
  label {
    border: 1px solid white;
    border-radius: 10px;
    padding: 1rem;
  }
</style>
