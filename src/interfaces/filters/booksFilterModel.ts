import { Currency, PrintingEditionSortType, PrintingEditionType } from "src/shared/enums";
import { BaseFilter } from "./baseFilter";

export interface PrintingEditionFilterModel extends BaseFilter {
    currency: Currency
    tableSort: PrintingEditionSortType
    typeProduct: PrintingEditionType;
    minPrice: number;
    maxPrice: number;
}