const Train = require('../model/train');
const User = require('../model/user');
const Booking = require('../model/booking');
const traincontroller = {

    createtrain: async (request, response) => {
        try {
            const { seat, tname, tnumber, fare, timing, fromStation, toStation } = request.body;
            const userId = request.userId;


            const train = new Train({
                tname,
                tnumber,
                fromStation,
                toStation,
                seat,
                fare,
                timing
            });
            const newdata = await train.save();
            response.json({ message: "data saved successfully" });

        } catch (error) {
            console.log("error in save hall data :", error);
            response.status(404).json({ error: "error in save hall data" });
        }
    },
    list: async (request, response) => {
        try {
            const train = await Train.find({}, {});
            response.send(train)
        } catch (error) {
            response.status(404).json({ error: "Error in getting list " })
            console.log("Error in getting list :", error);
        }
    },
    trainList: async (request, response) => {
        try {
            const { Trainid } = request.body;
            console.log("trainid :", Trainid)
            const train = await Train.findById(Trainid);
            response.send(train)
        } catch (error) {
            response.status(404).json({ error: "Error in getting list " })
            console.log("Error in getting list :", error);
        }
    },
    booking: async (request, response) => {
        try {
            const { tname, tnumber, seat, price, fromStation, toStation, timing, date } = request.body;
            const userId = request.userId

            const user = await User.findById(userId);

            const booking = new Booking({
                tname,
                tnumber,
                fromStation,
                toStation,
                seat,
                price,
                timing,
                date,
                userId
            });
            const newdata = await booking.save();
            user.data = user.data.concat(newdata._id);

            await user.save();

            response.json({ message: "data saved successfully", bookId: newdata._id });

        } catch (error) {
            console.log("error in save booking data :", error);
            response.status(404).json({ error: "error in save booking data" });
        }
    },
    payment: async (request, response) => {
        try {
            const { payment, bookId, Trainid, seat } = request.body;
            const train = await Train.findById(Trainid);
            const book = await Booking.findById(bookId)
            book.paymentStatus = "payment successfully done";
            train.seat = train.seat - seat;
            await train.save();
            await book.save();

        } catch (error) {
            response.status(404).json({ error: "Error in getting payment" })
        }
    },
    receipt: async (request, response) => {
        try {
            const { bookId } = request.body;

            const booking = await Booking.findById(bookId);
            response.send(booking)
        } catch (error) {
            response.status(404).json({ error: "Error in getting list " })
            console.log("Error in getting list :", error);
        }
    },
    bookinglist: async (request, response) => {
        try {
            const booking = await Booking.find({}, {});
            response.send(booking)
        } catch (error) {
            response.status(404).json({ error: "Error in getting booking list " })
            console.log("Error in getting booking list :", error);
        }
    },
    graph: async (request, response) => {
        try {
            const userId = request.userId;
            const graph = await Booking.find({ userId }).populate('userId');
            response.send(graph);
        } catch (error) {
            console.log('Error in graph', error);
            response.status(404).json({ message: "Error in graph" })
        }
    },

}

module.exports = traincontroller;
