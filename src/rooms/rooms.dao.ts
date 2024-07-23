import { OkPacket } from "mysql";
import { execute } from "../services/mysql.connector";
import { Room } from "./rooms.model";
import { roomQueries } from './rooms.queries';

//DAO data access object which is used to execute SQL queries
// these methods select the correct query (listed in rooms.queries) and set up the parameters for that query. 
//The heavy lifting is done by the code listed in the 'execute' method'(mysql.connector)). 
// 'execute' returns a promise, the DAO methods are all marked as 'async.'
export const readRooms = async () => {
    return execute<Room[]>(roomQueries.getRooms, []);
};

export const readRoomsByUser = async (username: string) => {
    return execute<Room[]>(roomQueries.getRoomsByUser, [username]);
};

export const readRoomsByRoomId = async (roomId: number) => {
    return execute<Room[]>(roomQueries.getRoomsByRoomId, [roomId]);
};

export const createRoom = async (room: Room) => {
    return execute<OkPacket>(roomQueries.createRoom,
        [room.description, room.pictureURL, room.isReserved, room.reservedBy, room.price]);
};

export const updateRoom = async (room: Room) => {
    return execute<OkPacket>(roomQueries.updateRoom,
        [room.isReserved, room.reservedBy, room.roomId]);
};

export const deleteRoom = async (roomId: number) => {
    return execute<OkPacket>(roomQueries.deleteRoom, [roomId]);
};
