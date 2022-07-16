import { IArtist, IUser, ITrack, IAlbum, IFavorites } from './_typesTS/types';

class Database {
  users = [] as IUser[];
  artists = [] as IArtist[];
  tracks = [] as ITrack[];
  albums = [] as IAlbum[];
  favorites = { artists: [], tracks: [], albums: [] } as IFavorites;
}

export const inMemoryDB = new Database();
