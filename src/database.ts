import { IArtist, IUser, ITrack, IAlbum, IFavorites } from './_typesTS/types';

export const db = {
  users: [] as IUser[],
  artists: [] as IArtist[],
  tracks: [] as ITrack[],
  albums: [] as IAlbum[],
  favorites: [] as IFavorites[],
};
