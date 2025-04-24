<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250424120857 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Create extension for UUID support
        $this->addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        // Drop existing tables and their constraints
        $this->addSql('DROP TABLE IF EXISTS hotel CASCADE');
        $this->addSql('DROP TABLE IF EXISTS hotel_group CASCADE');
        $this->addSql('DROP TABLE IF EXISTS hotel_keeper CASCADE');
        $this->addSql('DROP TABLE IF EXISTS admin CASCADE');

        // Create tables with UUID columns
        $this->addSql('CREATE TABLE IF NOT EXISTS admin (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), email VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL)');
        $this->addSql('CREATE TABLE IF NOT EXISTS hotel_group (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name VARCHAR(255) NOT NULL, description TEXT NOT NULL, logo_url TEXT NOT NULL)');
        $this->addSql('CREATE TABLE IF NOT EXISTS hotel_keeper (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), email VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, tel VARCHAR(20) NOT NULL)');
        $this->addSql('CREATE TABLE IF NOT EXISTS hotel (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name VARCHAR(255) NOT NULL, description TEXT NOT NULL, location VARCHAR(255) NOT NULL, hotel_group_id UUID REFERENCES hotel_group(id), hotel_keeper_id UUID REFERENCES hotel_keeper(id))');

        // Add comments for Doctrine type mapping
        $this->addSql('COMMENT ON COLUMN admin.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN admin.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN hotel_group.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN hotel_keeper.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN hotel_keeper.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN hotel.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN hotel.hotel_group_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN hotel.hotel_keeper_id IS \'(DC2Type:uuid)\'');
    }

    public function down(Schema $schema): void
    {
        // Drop all tables
        $this->addSql('DROP TABLE IF EXISTS hotel CASCADE');
        $this->addSql('DROP TABLE IF EXISTS hotel_group CASCADE');
        $this->addSql('DROP TABLE IF EXISTS hotel_keeper CASCADE');
        $this->addSql('DROP TABLE IF EXISTS admin CASCADE');
    }
}
