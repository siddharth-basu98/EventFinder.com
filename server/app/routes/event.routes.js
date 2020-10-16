module.exports = (app) => {
  const events = require("../controllers/event.controller.js");

  // Create a new Note
  app.post("/event", events.create);

  // Retrieve all events
  app.get("/events", events.findAll);

  // Retrieve a single Note with noteId
  app.get("/event/:eventId", events.findOne);

  // Update a Note with noteId
  app.put("/event/:eventId", events.update);

  // Delete a Note with noteId
  app.delete("/event/:eventId", events.delete);

  app.get("/event/title/:title", events.findByTitle);

  app.get("/event/domain/:domain", events.findByDomain);

  app.get("/event/location/:location", events.findByLocation);

  app.get("/event/organizer/:organizerName", events.findByOrganizer);
};
