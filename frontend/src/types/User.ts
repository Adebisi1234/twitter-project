export interface User {
  _id: string;
  username: string;
  password: string;
  notification: number;
  handle: string;
  bio: string;
  followers: string[];
  followersCount: number;
  following: string[];
  followingCount: number;
  pp: string;
  coverImg: string;
  posts: number;
  location: string;
  messageCount: number;
  fromGoogle: boolean;
  likes: string[];
  retweets: string[];
  rooms: string[];
}
