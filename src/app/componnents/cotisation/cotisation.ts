export class Cotisation {
    id!: number;
    cashflow_id!: number;
    pay_year?: Date;
    ref_ing_cost:string= "";
    member_id!: number;
    amount!: number;
    pay!: number;
    status:string= "";
    author: string= "";
    open_close?: boolean;
    created_at?: null;
    updated_at?: null
}
