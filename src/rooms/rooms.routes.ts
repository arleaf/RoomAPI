import { Router } from 'express';
import * as RoomController from './rooms.controller';

//It checks the validity of the user request and either invokes the correct controller or rejects the request based on below

const router = Router();
router
    .route('/rooms')
    .get(RoomController.readRooms);
router
    .route('/rooms/:username')
    .get(RoomController.readRoomsByUser);

router
    .route('/rooms')
    .post(RoomController.createRoom);

router
    .route('/rooms')
    .put(RoomController.updateRoom);
router
    .route('/rooms/:roomId')
    .delete(RoomController.deleteRoom);

export default router;