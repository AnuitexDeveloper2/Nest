import { SortType } from "src/shared/enums";

export interface BaseFilter {
    searchString: string;
    sortType: SortType;
    pageNumber: number;
    pageSize: number;
}