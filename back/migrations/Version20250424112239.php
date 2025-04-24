<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250424112239 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Add UUID extension if not exists
        $this->addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        // Drop existing tables and sequences
        $this->addSql('DROP TABLE IF EXISTS hotel CASCADE');
        $this->addSql('DROP TABLE IF EXISTS hotel_group CASCADE');
        $this->addSql('DROP TABLE IF EXISTS hotel_keeper CASCADE');
        $this->addSql('DROP SEQUENCE IF EXISTS hotel_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE IF EXISTS hotel_group_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE IF EXISTS hotel_keeper_id_seq CASCADE');

        // Create tables with UUID columns
        $this->addSql('CREATE TABLE hotel_group (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE TABLE hotel_keeper (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE TABLE hotel (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name VARCHAR(255) NOT NULL, description TEXT NOT NULL, hotel_group_id UUID NULL REFERENCES hotel_group(id), hotel_keeper_id UUID NULL REFERENCES hotel_keeper(id))');

        // Add comments for Doctrine type mapping
        $this->addSql('COMMENT ON COLUMN hotel_group.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN hotel_keeper.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN hotel.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN hotel.hotel_group_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN hotel.hotel_keeper_id IS \'(DC2Type:uuid)\'');
    }

    public function down(Schema $schema): void
    {
        $this->throwIrreversibleMigrationException('Cannot revert UUID migration safely.');
    }
}
