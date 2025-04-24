<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250424214523 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE traveler ADD roles JSON NULL
        SQL);
        
        // Set default roles for existing records
        $this->addSql(<<<'SQL'
            UPDATE traveler SET roles = '["ROLE_USER"]'
        SQL);
        
        // Now make the column NOT NULL
        $this->addSql(<<<'SQL'
            ALTER TABLE traveler ALTER COLUMN roles SET NOT NULL
        SQL);
        
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_6841F216E7927C74 ON traveler (email)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX UNIQ_6841F216E7927C74
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE traveler DROP roles
        SQL);
    }
}
