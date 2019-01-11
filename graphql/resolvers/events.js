const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
    events: async () => {
      try {
        const events = await Event.find();
        return events.map(event => {
          return transformEvent(event);
        });
      } catch (err) {
        throw err;
      }
    },
    createEvent: async (args, req) => {
      if(!req.isAuth) {
          throw Error("Not authenticated!");
      }  
      try {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: args.eventInput.price,
          date:  new Date(args.eventInput.date),
          creator: req.userId
        });
        let createdEvent;
        const result = await event.save();
        createdEvent = transformEvent(result);
        const loggedInUser = await User.findById(req.userId);
        if (!loggedInUser) {
          throw Error("User not found.");
        }
        loggedInUser.createdEvents.push(event);
        await loggedInUser.save();
        return createdEvent;
      } catch (err) {
        throw err;
      }
    }
  };
  