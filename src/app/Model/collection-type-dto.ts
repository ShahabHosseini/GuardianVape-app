import { ConditionDto } from './conditionDto';

export interface CollectionTypeDto {
  guid: string;
  conditions: ConditionDto[];
  // collectionType: boolean;
  // conditionType: boolean;
}
