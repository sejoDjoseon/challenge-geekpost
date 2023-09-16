import {FeedPost} from '../models/feedPost'

export interface IFeedInfra {
  getFeed: () => Promise<FeedPost[]>
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
}

export class FeedService implements IFeedService {
  constructor(
    private feedInfra: IFeedInfra,
    private userData: UserData,
    private fileStorage: IStorageInfra,
  ) {}

  getFeed = () => this.feedInfra.getFeed()

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
