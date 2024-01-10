import { Migration } from '@mikro-orm/migrations';

export class Migration20230116190103 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `question` (`id` binary(16) not null, `content` json not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `attempt` (`id` binary(16) not null, `created_at` datetime not null, `name` varchar(64) not null, `email` varchar(255) not null, `next_question_id` binary(16) null default null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `attempt` add index `attempt_next_question_id_index`(`next_question_id`);');

    this.addSql('create table `answer` (`id` binary(16) not null, `content` json not null, `is_correct` tinyint(1) not null, `question_id` binary(16) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `answer` add index `answer_question_id_index`(`question_id`);');

    this.addSql('create table `attempt_answer` (`id` binary(16) not null, `attempt_id` binary(16) not null, `question_id` binary(16) not null, `answer_id` binary(16) not null, `created_at` datetime not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `attempt_answer` add index `attempt_answer_attempt_id_index`(`attempt_id`);');
    this.addSql('alter table `attempt_answer` add index `attempt_answer_question_id_index`(`question_id`);');
    this.addSql('alter table `attempt_answer` add index `attempt_answer_answer_id_index`(`answer_id`);');
    this.addSql('alter table `attempt_answer` add unique `attempt_answer_attempt_id_question_id_unique`(`attempt_id`, `question_id`);');

    this.addSql('create table `app_user` (`id` binary(16) not null, `name` varchar(64) not null, `username` varchar(64) not null, `password` varchar(60) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `app_user` add unique `app_user_username_unique`(`username`);');

    this.addSql('alter table `attempt` add constraint `attempt_next_question_id_foreign` foreign key (`next_question_id`) references `question` (`id`) on update cascade on delete set null;');

    this.addSql('alter table `answer` add constraint `answer_question_id_foreign` foreign key (`question_id`) references `question` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `attempt_answer` add constraint `attempt_answer_attempt_id_foreign` foreign key (`attempt_id`) references `attempt` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `attempt_answer` add constraint `attempt_answer_question_id_foreign` foreign key (`question_id`) references `question` (`id`) on update cascade;');
    this.addSql('alter table `attempt_answer` add constraint `attempt_answer_answer_id_foreign` foreign key (`answer_id`) references `answer` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `attempt` drop foreign key `attempt_next_question_id_foreign`;');

    this.addSql('alter table `answer` drop foreign key `answer_question_id_foreign`;');

    this.addSql('alter table `attempt_answer` drop foreign key `attempt_answer_question_id_foreign`;');

    this.addSql('alter table `attempt_answer` drop foreign key `attempt_answer_attempt_id_foreign`;');

    this.addSql('alter table `attempt_answer` drop foreign key `attempt_answer_answer_id_foreign`;');

    this.addSql('drop table if exists `question`;');

    this.addSql('drop table if exists `attempt`;');

    this.addSql('drop table if exists `answer`;');

    this.addSql('drop table if exists `attempt_answer`;');

    this.addSql('drop table if exists `app_user`;');
  }

}
