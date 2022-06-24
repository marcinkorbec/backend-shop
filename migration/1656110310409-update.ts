import { MigrationInterface, QueryRunner } from "typeorm";

export class update1656110310409 implements MigrationInterface {
    name = 'update1656110310409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_item\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`shop_item\` ADD \`name\` varchar(65) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`description\` \`description\` text NOT NULL DEFAULT '(brak)'`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIME`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT 'curtime()'`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` CHANGE \`description\` \`description\` text NOT NULL DEFAULT ''''`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`shop_item\` ADD \`name\` varchar(60) NOT NULL`);
    }

}
