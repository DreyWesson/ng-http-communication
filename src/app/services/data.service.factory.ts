import { LoggerService } from './logger.service';
import { DataService } from './data.service';

export function dataServiceFactory(logger: LoggerService) {
  // tslint:disable-next-line: prefer-const
  let dataService: DataService = new DataService(logger)

  logger.log(`factory function injection style`);
  return dataService;
}
