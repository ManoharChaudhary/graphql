const Event = require("../../models/event");
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
    createEvent: async args => {
      try {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: args.eventInput.price,
          date:  dateToString(args.eventInput.date),
          creator: loggedInUserId
        });
        let createdEvent;
        const result = await event.save();
        createdEvent = transformEvent(result);
        const loggedInUser = await User.findById(loggedInUserId);
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
  