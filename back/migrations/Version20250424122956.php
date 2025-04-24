<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250424122956 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Drop all tables
        $this->addSql('DROP TABLE IF EXISTS search_history CASCADE');
        $this->addSql('DROP TABLE IF EXISTS user_badge CASCADE');
        $this->addSql('DROP TABLE IF EXISTS traveler CASCADE');

        // Create tables with UUID
        $this->addSql('CREATE TABLE traveler (id UUID NOT NULL, email VARCHAR(180) NOT NULL, password_hash VARCHAR(255) NOT NULL, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, tel BIGINT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');

        $this->addSql('CREATE TABLE search_history (id INT NOT NULL, traveler_id UUID NOT NULL, search_query TEXT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');

        $this->addSql('CREATE TABLE user_badge (id INT NOT NULL, traveler_id UUID NOT NULL, badge_type VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');

        $this->addSql('ALTER TABLE search_history ADD CONSTRAINT fk_aa6b9fd159bbe8a3 FOREIGN KEY (traveler_id) REFERENCES traveler (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_badge ADD CONSTRAINT fk_1c5aa01459bbe8a3 FOREIGN KEY (traveler_id) REFERENCES traveler (id) NOT DEFERRABLE INITIALLY IMMEDIATE');

        $this->addSql('COMMENT ON COLUMN traveler.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN search_history.traveler_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN user_badge.traveler_id IS \'(DC2Type:uuid)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE traveler_id_seq INCREMENT BY 1 MINVALUE 1 START 1
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE admin ALTER id SET DEFAULT 'uuid_generate_v4()'
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX UNIQ_3535ED9C5353641
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel ALTER id SET DEFAULT 'uuid_generate_v4()'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_3535ED9C5353641 ON hotel (hotel_keeper_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_keeper ALTER id SET DEFAULT 'uuid_generate_v4()'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_group ALTER id SET DEFAULT 'uuid_generate_v4()'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE search_history ALTER traveler_id TYPE INT
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN search_history.traveler_id IS NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE traveler ALTER id TYPE INT
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE traveler_id_seq
        SQL);
        $this->addSql(<<<'SQL'
            SELECT setval('traveler_id_seq', (SELECT MAX(id) FROM traveler))
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE traveler ALTER id SET DEFAULT nextval('traveler_id_seq')
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN traveler.id IS NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge ALTER traveler_id TYPE INT
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN user_badge.traveler_id IS NULL
        SQL);
    }
}
