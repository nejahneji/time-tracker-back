import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Period } from './entities/Period';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/periods')
  async getAllPeriods(): Promise<Period[]> {
    const response: Period[] = await this.appService.findAll();
    return response;
  }

  @Post('/periods/new')
  async addPeriod(): Promise<Period> {
    const response = await this.appService.addPeriod();
    return response;
  }

  @Put('/periods/stop')
  async stopPeriod(): Promise<Period> {
    const response = await this.appService.stopPeriod();
    return response;
  }
}
