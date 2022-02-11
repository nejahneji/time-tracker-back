import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Period } from './entities/Period';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Period)
    private periodRepository: Repository<Period>,
  ) {}

  findAll(): Promise<Period[]> {
    return this.periodRepository.find({ order: { id: 'DESC' } });
  }

  async addPeriod(): Promise<Period> {
    const count = await this.periodRepository.count();
    const period = new Period();
    period.name = `Period ${count + 1}`;
    period.startTime = new Date();
    return this.periodRepository.save(period);
  }

  async stopPeriod(): Promise<Period> {
    const lastRow = await this.getLastRow();
    if (lastRow) {
      lastRow.endTime = new Date();
      return this.periodRepository.save(lastRow);
    }
    //TODO: NO ROW TO UPDATE
    return;
  }

  getLastRow(): Promise<Period> {
    return this.periodRepository
      .createQueryBuilder('row')
      .where('row.endTime is null')
      .orderBy('row.startTime', 'DESC')
      .limit(1)
      .getOne();
  }
}
