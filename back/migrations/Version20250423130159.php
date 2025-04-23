<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250423130159 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE admin (id SERIAL NOT NULL, email VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN admin.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE badge (id SERIAL NOT NULL, name VARCHAR(100) NOT NULL, description TEXT NOT NULL, icon_url TEXT NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE hotel (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, description TEXT NOT NULL, location VARCHAR(255) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE hotel_group (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, description TEXT NOT NULL, logo_url TEXT NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE hotel_keeper (id SERIAL NOT NULL, email VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN hotel_keeper.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE hotel_keeper_hotel (hotel_keeper_id INT NOT NULL, hotel_id INT NOT NULL, PRIMARY KEY(hotel_keeper_id, hotel_id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_B4A1B7DAC5353641 ON hotel_keeper_hotel (hotel_keeper_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_B4A1B7DA3243BB18 ON hotel_keeper_hotel (hotel_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE message (id SERIAL NOT NULL, sender_id VARCHAR(255) NOT NULL, receiver_id VARCHAR(255) NOT NULL, sender_type VARCHAR(255) NOT NULL, message TEXT DEFAULT NULL, sent_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN message.sent_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE search_history (id SERIAL NOT NULL, traveler_id INT DEFAULT NULL, searched_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_AA6B9FD159BBE8A3 ON search_history (traveler_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN search_history.searched_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE traveler (id SERIAL NOT NULL, email VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, tel BIGINT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN traveler.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE user_badge (id SERIAL NOT NULL, traveler_id INT DEFAULT NULL, badge_id INT NOT NULL, awarded_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_1C32B34559BBE8A3 ON user_badge (traveler_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_1C32B345F7A2C2FC ON user_badge (badge_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_keeper_hotel ADD CONSTRAINT FK_B4A1B7DAC5353641 FOREIGN KEY (hotel_keeper_id) REFERENCES hotel_keeper (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_keeper_hotel ADD CONSTRAINT FK_B4A1B7DA3243BB18 FOREIGN KEY (hotel_id) REFERENCES hotel (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE search_history ADD CONSTRAINT FK_AA6B9FD159BBE8A3 FOREIGN KEY (traveler_id) REFERENCES traveler (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge ADD CONSTRAINT FK_1C32B34559BBE8A3 FOREIGN KEY (traveler_id) REFERENCES traveler (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge ADD CONSTRAINT FK_1C32B345F7A2C2FC FOREIGN KEY (badge_id) REFERENCES badge (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_keeper_hotel DROP CONSTRAINT FK_B4A1B7DAC5353641
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_keeper_hotel DROP CONSTRAINT FK_B4A1B7DA3243BB18
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE search_history DROP CONSTRAINT FK_AA6B9FD159BBE8A3
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge DROP CONSTRAINT FK_1C32B34559BBE8A3
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge DROP CONSTRAINT FK_1C32B345F7A2C2FC
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE admin
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE badge
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE hotel
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE hotel_group
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE hotel_keeper
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE hotel_keeper_hotel
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE message
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE search_history
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE traveler
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE user_badge
        SQL);
    }
}
