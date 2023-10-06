import { VariantItemDto } from "./variant-item";

export interface VariantDto{

  optionName: string;
  optionValues:string[];
  variantItems:VariantItemDto[];
}
