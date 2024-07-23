// the query object is a set of key-value pairs. value is a JavaScript template literal. The key and the value is passed to the 'execute' function of the DAO. 
//The second parameter to 'execute' is an array of parameters.
// The question mark appears in the query, the ? is replaced by the parameter
export const roomQueries = {
    getRooms:
        `SELECT roomId as roomId, description as description, pictureURL as pictureURL, isReserved as isReserved, reservedBy as reservedBy, price as price from cst451.hotel_rooms`,
    getRoomsByRoomId:
        `SELECT roomId as roomId, description as description, pictureURL as pictureURL, isReserved as isReserved, reservedBy as reservedBy, price as price from cst451.hotel_rooms
	   WHERE cst451.hotel_rooms.roomId = ?`,
    createRoom:
        `INSERT INTO cst451.hotel_rooms(description, pictureURL, isReserved, reservedBy, price) VALUES(?,?,?,?,?)`,
    updateRoom:
        `UPDATE cst451.hotel_rooms SET isReserved=?, reservedBy=? WHERE roomId = ?`,
    deleteRoom:
        `DELETE FROM cst451.hotel_rooms where roomId = ?`,
    getRoomsByUser:
        `SELECT roomId as roomId, description as description, pictureURL as pictureURL, isReserved as isReserved, reservedBy as reservedBy, price as price from cst451.hotel_rooms where reservedBy = ?`,

}