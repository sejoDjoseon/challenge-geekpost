import storage from '@react-native-firebase/storage'
import {Image} from 'react-native-compressor'

export default class FilesStorage {
  #storage = storage()

  uploadFromFilePath = (filePath: string, name: string) => {
    return new Promise<string>((resolve, reject) => {
      Image.compress(filePath)
        .then(compressedFile => {
          const storageRef = this.#storage.ref(`images/${name}`)
          const uploadTask = storageRef.putFile(compressedFile)
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
        .catch(err => {
          console.warn('error compressing image')
          reject(err)
        })
    })
  }
}
