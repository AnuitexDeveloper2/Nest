export enum PrintingEditionType {
    Book = 0,
    Newspaper = 1,
    Magazine = 2
}

export enum Currency {
    USD = 0,
    EUR = 1,
    GBP = 2,
    CHF = 3,
    JPY = 4,
    UAH = 5
}

export enum Category {
    Book = 0,
    Newspaper = 1,
    Category = 2
}

export enum SortType {
    None = 0,
    Asc = 1,
    Desc = -1
}

export enum UserFilterType {
    All = 0,
    Active = 1,
    Blocked = 2,
}

export enum Role {
    Admin = 0,
    User = 1
}

export enum OrderStatusType {
    Unpaid = 0,
    Paid = 1
}

export enum PrintingEditionSortType {
    Id = 0,
    Price = 1,
    Title = 2,
  }