import storage from '@react-native-firebase/storage'

export default class FilesStorage {
  #reference = storage().ref('images')

  uploadFromFilePath = (filePath: string) => {
    new Promise<string>((resolve, reject) => {
      this.#reference
        .putFile(filePath)
        .then(res => {
          resolve(res.ref.getDownloadURL())
        })
        .catch(err => reject(err))
    })
  }

  uploadFromCamera = (filePath: Blob | Uint8Array | ArrayBuffer) => {
    new Promise<string>((resolve, reject) => {
      this.#reference
        .put(filePath)
        .then(res => {
          resolve(res.ref.getDownloadURL())
        })
        .catch(err => reject(err))
    })
  }
}
