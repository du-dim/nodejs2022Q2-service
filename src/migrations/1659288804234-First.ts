import { MigrationInterface, QueryRunner } from "typeorm";

export class First1659288804234 implements MigrationInterface {
    name = 'First1659288804234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "traсk" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(20) NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_04badef4125b125fa6bc189c7fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "grammy" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(20) NOT NULL, "year" integer NOT NULL DEFAULT '0', "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(20) NOT NULL, "password" text NOT NULL, "version" integer NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_album" ("favoritesId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_59c6fe6dca787f489120c41da29" PRIMARY KEY ("favoritesId", "albumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1a1c1aa01c513e22e02c1759c9" ON "favorites_album" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_87964b00ff4a771ac9a1fbb178" ON "favorites_album" ("albumId") `);
        await queryRunner.query(`CREATE TABLE "favorites_artist" ("favoritesId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_3e9fff88f5c8f0a5efedb459ead" PRIMARY KEY ("favoritesId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6228f8935eb72f12c68f50d062" ON "favorites_artist" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fe5400f6a74fcb895907bb3219" ON "favorites_artist" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "favorites_track" ("favoritesId" uuid NOT NULL, "traсkId" uuid NOT NULL, CONSTRAINT "PK_a268c28ceec8750ead23d55ccb1" PRIMARY KEY ("favoritesId", "traсkId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_62742088f334ab943d3637eb43" ON "favorites_track" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c67b7cd7737f31f5153ce6da60" ON "favorites_track" ("traсkId") `);
        await queryRunner.query(`ALTER TABLE "traсk" ADD CONSTRAINT "FK_2bdcc7be0918fe8a63395b23040" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "traсk" ADD CONSTRAINT "FK_6f68439ce58f74e01f6c5d8dbf4" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites_album" ADD CONSTRAINT "FK_1a1c1aa01c513e22e02c1759c95" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_album" ADD CONSTRAINT "FK_87964b00ff4a771ac9a1fbb1785" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_artist" ADD CONSTRAINT "FK_6228f8935eb72f12c68f50d062e" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_artist" ADD CONSTRAINT "FK_fe5400f6a74fcb895907bb32193" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_track" ADD CONSTRAINT "FK_62742088f334ab943d3637eb432" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_track" ADD CONSTRAINT "FK_c67b7cd7737f31f5153ce6da60b" FOREIGN KEY ("traсkId") REFERENCES "traсk"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites_track" DROP CONSTRAINT "FK_c67b7cd7737f31f5153ce6da60b"`);
        await queryRunner.query(`ALTER TABLE "favorites_track" DROP CONSTRAINT "FK_62742088f334ab943d3637eb432"`);
        await queryRunner.query(`ALTER TABLE "favorites_artist" DROP CONSTRAINT "FK_fe5400f6a74fcb895907bb32193"`);
        await queryRunner.query(`ALTER TABLE "favorites_artist" DROP CONSTRAINT "FK_6228f8935eb72f12c68f50d062e"`);
        await queryRunner.query(`ALTER TABLE "favorites_album" DROP CONSTRAINT "FK_87964b00ff4a771ac9a1fbb1785"`);
        await queryRunner.query(`ALTER TABLE "favorites_album" DROP CONSTRAINT "FK_1a1c1aa01c513e22e02c1759c95"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`ALTER TABLE "traсk" DROP CONSTRAINT "FK_6f68439ce58f74e01f6c5d8dbf4"`);
        await queryRunner.query(`ALTER TABLE "traсk" DROP CONSTRAINT "FK_2bdcc7be0918fe8a63395b23040"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c67b7cd7737f31f5153ce6da60"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62742088f334ab943d3637eb43"`);
        await queryRunner.query(`DROP TABLE "favorites_track"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe5400f6a74fcb895907bb3219"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6228f8935eb72f12c68f50d062"`);
        await queryRunner.query(`DROP TABLE "favorites_artist"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87964b00ff4a771ac9a1fbb178"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1a1c1aa01c513e22e02c1759c9"`);
        await queryRunner.query(`DROP TABLE "favorites_album"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "traсk"`);
    }

}
