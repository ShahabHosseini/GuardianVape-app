import { CollectionTypeDto } from './collection-type-dto';
import { ImageDto } from './image-dto';
import { TitleDescriptionDto } from './title-description-dto';

export interface CollectionDto {
  guid: string;
  titleDescription: TitleDescriptionDto;
  collectionType: CollectionTypeDto;
  image?: ImageDto;
}
