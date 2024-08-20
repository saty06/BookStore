export interface IBOOK {
    id? : number | string;
    description: string;
    discountPrice?: number;
    bookImage: string;
    admin_user_id: number;
    bookName: string;
    author: string;
    quantity: number;
    price: number;
}