import { CollectionTypeDto } from './collection-type-dto';
import { TitleDescriptionDto } from './title-description-dto';

export interface CollectionDto {
  titleDescription: TitleDescriptionDto;
  collectionType: CollectionTypeDto;
  imageGuid: string;
}
