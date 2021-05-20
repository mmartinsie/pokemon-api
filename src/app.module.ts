import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FindByNameController } from './pokemon/findByName/findByName.controller';
import { CsvController } from './pokemon/csv/csv.controller';

@Module({
  imports: [],
  controllers: [AppController, FindByNameController, CsvController],
  providers: [AppService],
})
export class AppModule {}
