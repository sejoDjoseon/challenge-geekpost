import storage from '@react-native-firebase/storage'

export default class FilesStorage {
  #storage = storage()

  uploadFromFilePath = (filePath: string, name: string) => {
    return new Promise<string>((resolve, reject) => {
      const storageRef = this.#storage.ref(`images/${name}`)

      const uploadTask = storageRef.putFile(filePath)
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          if (progress === 100) console.info('Upload complete')
        },
        error => {
          console.warn('error uploading image')
          reject(error)
        },
        () => {
          storageRef.getDownloadURL().then(downloadURL => {
            resolve(downloadURL)
          })
        },
      )
    })
  }

  uploadFromCamera = (
    filePath: Blob | Uint8Array | ArrayBuffer,
    name: string,
  ) => {
    return new Promise<string>((resolve, reject) => {
      this.#storage
        .ref(name)
        .put(filePath)
        .then(res => {
          resolve(res.ref.getDownloadURL())
        })
        .catch(err => reject(err))
    })
  }
}
