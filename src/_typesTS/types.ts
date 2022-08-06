export interface IUser {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
export interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
export interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
export interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
export interface IFavoritesRepsonse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

export enum EEntity {
  ARTIST = 'artist',
  ALBUM = 'album',
  TRACK = 'track',
}

export interface IHttpExceptionRes {
  statusCode: number;
  error: string;
}

export interface ICustomHttpExceptionRes extends IHttpExceptionRes {
  path: string;
  method: string;
  timeStamp: Date;
}
