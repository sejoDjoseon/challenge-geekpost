import {FeedPost} from '../models/feedPost'

export interface IFeedInfra {
  getFeed: (startAfterId?: string) => Promise<{feed: FeedPost[]; cursor: any}>
  createPublication: (
    imagePath: string,
    description: string,
    userName: string,
  ) => Promise<void>
}

export interface IStorageInfra {
  uploadFromFilePath: (filePath: string, filename: string) => Promise<string>
}

export interface UserData {
  userName: string
}

export interface IFeedService {
  getFeed: () => Promise<FeedPost[]>
  getMoreFeed: () => Promise<FeedPost[]>
  createFeed: (imagePath: string, description: string) => Promise<void>
}

export class FeedService implements IFeedService {
  #cursor?: any

  constructor(
    private feedInfra: IFeedInfra,
    private userData: UserData,
    private fileStorage: IStorageInfra,
  ) {}

  getFeed = () =>
    this.feedInfra.getFeed().then(({feed, cursor}) => {
      this.#cursor = cursor
      return feed
    })

  getMoreFeed = () =>
    this.#cursor
      ? this.feedInfra.getFeed(this.#cursor).then(({feed, cursor}) => {
          this.#cursor = cursor
          return feed
        })
      : new Promise<FeedPost[]>(resolve => {
          resolve([])
        })

  createFeed = (imagePath: string, description: string) => {
    const userName = this.userData.userName
    const date = new Date()
    return this.fileStorage
      .uploadFromFilePath(imagePath, `${userName}-${date.toISOString()}`)
      .then(imgUrl =>
        this.feedInfra.createPublication(imgUrl, description, userName),
      )
  }
}
