export default interface Product {
    id: string | undefined,
    name: string,
    price: number,
    description: string,
    imageUrl?: string
}