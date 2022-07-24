import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  name: string;

  @Column({ type: 'uuid', default: null })
  artistId: string | null;

  @Column({ type: 'int', default: 0 })
  year: number;
}
