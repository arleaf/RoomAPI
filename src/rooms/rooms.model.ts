//interface that will be turned into objects from the server's stream of JSON data
//matching database fields
export interface Room {
    roomId: number,
    description: string,
    pictureURL: string,
    isReserved: boolean,
    reservedBy: string,
    price: number,
}