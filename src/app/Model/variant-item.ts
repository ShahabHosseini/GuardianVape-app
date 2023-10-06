import { ImageDto } from "./image-dto";

export interface VariantItemDto{
id?: string;
image?: ImageDto;
variant:string;
price:number;
available:number;
onHand:number;
sku:string;
barcode:string;
editing?: boolean; // Add the editing property
}
