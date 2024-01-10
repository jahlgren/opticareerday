import { Migration } from '@mikro-orm/migrations';

export class Migration20230119195540 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `attempt` add `ended_at` datetime null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `attempt` drop `ended_at`;');
  }

}
