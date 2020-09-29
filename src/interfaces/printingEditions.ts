import { AuthorEntity } from "src/entities/author.entity";
import { Currency, PrintingEditionType } from "src/shared/enums";

export interface PrintingEditionModel {
    title: string;
    description: string;
    price: number;
    currency: Currency;
    productType: PrintingEditionType;
    author_ids: Array<AuthorEntity>
    cover_image: string
}