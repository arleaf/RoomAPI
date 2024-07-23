import { Request, RequestHandler, Response } from "express";
import { Room } from './rooms.model';
import * as RoomsDAO from './rooms.dao';
import { OkPacket } from "mysql";

//The 'readRooms' method supports optional URL query strings.
//http://localhost:5000/rooms and http://localhost:5000/rooms?roomsId=7
//Both of these methods will be routed to this method
export const readRooms: RequestHandler = async (req: Request, res: Response) => {
    try {
        let rooms;
        //determining the possible query parameter:
        let roomId = parseInt(req.query.roomId as string);

        console.log('roomId', roomId);
        //if Id empty, get all rooms
        if (Number.isNaN(roomId)) {
            rooms = await RoomsDAO.readRooms();
        }
        //if id, return room with matching id
        else {
            rooms = await RoomsDAO.readRoomsByRoomId(roomId);
        }
        res.status(200).json(
            rooms
        );
    } catch (error) {
        //return error
        console.error('[rooms.controller][readRooms][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching rooms'
        });
    }
};


//http://localhost:5000/rooms/username will be routed to this method
export const readRoomsByUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        //parse username from parameters (URL)
        let username = req.params.username as string;
        console.log('username', username);
        //call query
        const rooms = await RoomsDAO.readRoomsByUser(req.params.username);

        res.status(200).json(rooms);
    } catch (error) {
        //return error
        console.error('[rooms.controller][readRoomsByUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching rooms'
        });
    }
};
//http://localhost:5000/rooms will be routed to this method
//@param - request body (JSON of room to be added)
export const createRoom: RequestHandler = async (req: Request, res: Response) => {
    try {
        //calling create query
        const okPacket: OkPacket = await RoomsDAO.createRoom(req.body);

        console.log('req.body', req.body);
        console.log('room', okPacket);

        res.status(200).json(okPacket);
    }
    catch (error) {
        //return error
        console.error('[rooms.controller][createRoom][Error] ', error);
        console.log('room create ', req.body);
        res.status(500).json({
            message: 'There was an error when writing rooms'

        });
    }
};

//http://localhost:5000/rooms will be routed to this method
//@param - request body (JSON of room to be updated)
export const updateRoom: RequestHandler = async (req: Request, res: Response) => {
    try {
        //calling query
        const okPacket: OkPacket = await RoomsDAO.updateRoom(req.body);

        console.log('req.body', req.body);
        console.log('room', okPacket);

        res.status(200).json(okPacket);
    } catch (error) {
        //return error
        console.error('[room.controller][updateRoom][Error] ', error);
        console.log('car', req.body);
        res.status(500).json({
            message: 'There was an error when writing rooms'
        });
    }
};

//http://localhost:5000/rooms will be routed to this method
//@param - roomId of room to be deleted
export const deleteRoom: RequestHandler = async (req: Request, res: Response) => {
    try {
        //parse roomId number
        let roomId = parseInt(req.params.roomId as string);
        console.log('roomId', roomId);
        //check id is not null
        if (!Number.isNaN(roomId)) {
            const response = await RoomsDAO.deleteRoom(roomId);
            res.status(200).json(response);

        } else {
            throw new Error("Integer expected for roomId");
        }

    } catch (error) {
        //return error
        console.error('[rooms.controller][deleteRoom][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting Rooms'
        });
    }
};