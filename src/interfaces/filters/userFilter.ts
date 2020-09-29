import { UserFilterType } from "src/shared/enums";
import { BaseFilter } from "./baseFilter";

export interface UserFilter extends BaseFilter {
    userType: UserFilterType
}