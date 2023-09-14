import {FeedPost} from '../models/feedPost'

export interface IFeedInfra {
  getFeed: () => Promise<FeedPost[]>
}

export interface IFeedService {
  getFeed: () => Promise<FeedPost[]>
}

export class FeedService implements IFeedService {
  constructor(private feedInfra: IFeedInfra) {}

  getFeed = () => this.feedInfra.getFeed()
}
