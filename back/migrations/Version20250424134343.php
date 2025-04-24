<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250424134343 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            DROP SEQUENCE message_id_seq CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE admin ALTER id DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_3535ED9C5353641
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel ALTER id DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_3535ED9C5353641 ON hotel (hotel_keeper_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_group ALTER id DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_keeper ALTER id DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message ADD sender_traveler_id UUID NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message ADD receiver_hotel_keeper_id UUID NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message DROP sender_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message DROP receiver_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message DROP sender_type
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message ALTER id TYPE UUID
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message ALTER id DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN message.sender_traveler_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN message.receiver_hotel_keeper_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN message.id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message ADD CONSTRAINT FK_B6BD307FBC3AD2F0 FOREIGN KEY (sender_traveler_id) REFERENCES traveler (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message ADD CONSTRAINT FK_B6BD307F17E0A4D FOREIGN KEY (receiver_hotel_keeper_id) REFERENCES hotel_keeper (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_B6BD307FBC3AD2F0 ON message (sender_traveler_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_B6BD307F17E0A4D ON message (receiver_hotel_keeper_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE search_history ADD searched_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE search_history DROP search_query
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE search_history DROP created_at
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE search_history_id_seq
        SQL);
        $this->addSql(<<<'SQL'
            SELECT setval('search_history_id_seq', (SELECT MAX(id) FROM search_history))
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE search_history ALTER id SET DEFAULT nextval('search_history_id_seq')
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE search_history ALTER traveler_id DROP NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN search_history.searched_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE traveler ALTER email TYPE VARCHAR(255)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE traveler ALTER created_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN traveler.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge ADD badge_id INT NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge ADD awarded_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge DROP badge_type
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge DROP created_at
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE user_badge_id_seq
        SQL);
        $this->addSql(<<<'SQL'
            SELECT setval('user_badge_id_seq', (SELECT MAX(id) FROM user_badge))
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge ALTER id SET DEFAULT nextval('user_badge_id_seq')
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge ALTER traveler_id DROP NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge ADD CONSTRAINT FK_1C32B345F7A2C2FC FOREIGN KEY (badge_id) REFERENCES badge (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_1C32B345F7A2C2FC ON user_badge (badge_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE message_id_seq INCREMENT BY 1 MINVALUE 1 START 1
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message DROP CONSTRAINT FK_B6BD307FBC3AD2F0
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message DROP CONSTRAINT FK_B6BD307F17E0A4D
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_B6BD307FBC3AD2F0
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_B6BD307F17E0A4D
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message ADD sender_id VARCHAR(255) NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message ADD receiver_id VARCHAR(255) NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message ADD sender_type VARCHAR(255) NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message DROP sender_traveler_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message DROP receiver_hotel_keeper_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message ALTER id TYPE INT
        SQL);
        $this->addSql(<<<'SQL'
            CREATE SEQUENCE message_id_seq
        SQL);
        $this->addSql(<<<'SQL'
            SELECT setval('message_id_seq', (SELECT MAX(id) FROM message))
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE message ALTER id SET DEFAULT nextval('message_id_seq')
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN message.id IS NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge DROP CONSTRAINT FK_1C32B345F7A2C2FC
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_1C32B345F7A2C2FC
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge ADD badge_type VARCHAR(255) NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge ADD created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge DROP badge_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge DROP awarded_at
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge ALTER id DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_badge ALTER traveler_id SET NOT NULL
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
            ALTER TABLE search_history ADD search_query TEXT NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE search_history ADD created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE search_history DROP searched_at
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE search_history ALTER id DROP DEFAULT
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE search_history ALTER traveler_id SET NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE admin ALTER id SET DEFAULT 'uuid_generate_v4()'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE hotel_group ALTER id SET DEFAULT 'uuid_generate_v4()'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE traveler ALTER email TYPE VARCHAR(180)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE traveler ALTER created_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN traveler.created_at IS NULL
        SQL);
    }
}
