import { Migration } from '@mikro-orm/migrations';

export class Migration20240117122606 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `question` add `company` varchar(255);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `question` drop `company`;');
  }

}
