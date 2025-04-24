<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250424111356 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_keeper_hotel DROP CONSTRAINT fk_b4a1b7dac5353641
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_keeper_hotel DROP CONSTRAINT fk_b4a1b7da3243bb18
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE hotel_keeper_hotel
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel ADD hotel_keeper_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel ADD CONSTRAINT FK_3535ED9C5353641 FOREIGN KEY (hotel_keeper_id) REFERENCES hotel_keeper (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_3535ED9C5353641 ON hotel (hotel_keeper_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE hotel_keeper_hotel (hotel_keeper_id INT NOT NULL, hotel_id INT NOT NULL, PRIMARY KEY(hotel_keeper_id, hotel_id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX idx_b4a1b7da3243bb18 ON hotel_keeper_hotel (hotel_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX idx_b4a1b7dac5353641 ON hotel_keeper_hotel (hotel_keeper_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_keeper_hotel ADD CONSTRAINT fk_b4a1b7dac5353641 FOREIGN KEY (hotel_keeper_id) REFERENCES hotel_keeper (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_keeper_hotel ADD CONSTRAINT fk_b4a1b7da3243bb18 FOREIGN KEY (hotel_id) REFERENCES hotel (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel DROP CONSTRAINT FK_3535ED9C5353641
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX UNIQ_3535ED9C5353641
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel DROP hotel_keeper_id
        SQL);
    }
}
