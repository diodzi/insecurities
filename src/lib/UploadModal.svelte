<script>
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
  import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
  import { db, storage, auth, isUploading, loggedIn } from './firebase'
  import Modal from './Modal.svelte'

  let rawFileToUpload
  let editFileToUpload
  let postName
  let hasRAWFile = false
  let hasEDITFile = false

  async function uploadSet() {
    if (postName) {
      try {
        const rawPic = rawFileToUpload.files[0]

        const rawStorageLocation = ref(
          storage,
          `${auth.currentUser.email}/${rawPic.name}`
        )

        await uploadBytes(rawStorageLocation, rawPic)
        const rawUrl = await getDownloadURL(rawStorageLocation)

        let editUrl = 'empty'

        if (editFileToUpload.value != '') {
          console.log('it actually went through sadge')
          const editPic = editFileToUpload.files[0]

          const editStorageLocation = ref(
            storage,
            `${auth.currentUser.email}/${editPic.name}`
          )
          await uploadBytes(editStorageLocation, editPic)
          editUrl = await getDownloadURL(editStorageLocation)
        }

        try {
          await addDoc(collection(db, 'posts'), {
            title: postName,
            rawRef: rawUrl,
            editRef: editUrl,
            timestamp: serverTimestamp(),
            account: auth.currentUser.email,
          })

          isUploading.set(false)
          postName = ''
          rawFileToUpload.value = ''
          editFileToUpload.value = ''
          hasRAWFile = false
          hasEDITFile = false
        } catch (err) {
          alert(
            "error 001: you probably don't have a file selected. firebase error log: " +
              err
          )
        }
      } catch (err) {
        alert('error 002: unknown error occurred. firebase error log: ' + err)
      }
    } else {
      alert('please enter a name')
    }
  }

  function doesHaveFile(whichBtn) {
    if (whichBtn == 'raw') {
      rawFileToUpload.files[0]?.name != ''
        ? (hasRAWFile = true)
        : (hasRAWFile = false)
    } else {
      editFileToUpload.files[0]?.name != ''
        ? (hasEDITFile = true)
        : (hasEDITFile = false)
    }
  }
</script>

<main>
  <Modal>
    {#if $loggedIn}
      <input
        type="text"
        name="postName"
        id="postName"
        placeholder="Post Name"
        bind:value={postName}
        maxlength="30"
      />

      <div class="uploadbtns">
        <label for="raw" class:hasFile={hasRAWFile}>RAW Upload</label>
        <input
          type="file"
          id="raw"
          bind:this={rawFileToUpload}
          on:change={() => doesHaveFile('raw')}
        />

        <label for="edit" class:hasFile={hasEDITFile}>EDIT Upload</label>
        <input
          type="file"
          id="edit"
          bind:this={editFileToUpload}
          on:change={() => doesHaveFile('edit')}
        />
      </div>

      <button type="button" on:click={uploadSet}>submit</button>
      <button type="button" on:click={() => isUploading.set(false)}
        >cancel</button
      >
    {:else}
      please log in to upload.
      <button type="button" on:click={() => isUploading.set(false)}
        >close</button
      >
    {/if}
  </Modal>
</main>

<style>
  .hasFile {
    background-color: aquamarine;
  }

  .uploadbtns {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  .uploadbtns > label {
    padding: 5rem 0.5rem;
  }

  label,
  button {
    border: 0.2rem solid black;
  }
</style>
