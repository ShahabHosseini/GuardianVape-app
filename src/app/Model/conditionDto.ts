import { IdTitleDto } from './id-title-dto';

export interface ConditionDto {
  guid: string;
  conditionType: IdTitleDto;
  equalType: IdTitleDto;
  result: string;
}
