import { ticketModel } from "./models/ticketModel.js";

export default class Ticket{
    createTicket = async (ticket) =>{
        try {
            return await ticketModel.create(ticket);
        } catch (error) {
            console.error('Error de create ticket dao: ', error.message);
            return null;
        }
    }

    getAllTickets = async () =>{
        try {
            return await ticketModel.find().populate('purchaser').populate('products.productId');// ver si le pongo lean() o no
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    getTicketById = async (tid) =>{
        try {
            return await ticketModel.findById(tid);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    getTicketsByUserId = async (uid) =>{
        try {
            return await ticketModel.find({ userId: uid });
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }


}