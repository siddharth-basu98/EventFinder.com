const Event = require("../models/event.model.js");

// Create and Save a new Event
exports.create = (req, res, next) => {
  // Validate request
  const title = req.body.title;
  const domain = req.body.domain;
  const price = req.body.price;
  const location = req.body.location;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const photoPath = req.body.photoPath;
  const description = req.body.description;
  const organizerName = req.body.organizerName;

  //console.log(req.body);

  const submissionErrors = [];

  if (!title) submissionErrors.push("You must provide title for your event");
  if (!domain) submissionErrors.push("You must provide domain for your event");
  if (!price) submissionErrors.push("You must provide price for your event");
  if (!location)
    submissionErrors.push("You must specify location for your event");
  if (!startDate)
    submissionErrors.push("You must specify start date for your event");
  if (!endDate)
    submissionErrors.push("You must specify end date for your event");
  if (!description)
    submissionErrors.push("You must specify description of your event");
  if (!organizerName) submissionErrors.push("You must provide your name");

  if (submissionErrors.length)
    return res.status(422).send({ errors: submissionErrors });

  const event = new Event({
    title: title,
    domain: domain,
    price: price,
    location: location,
    startDate: startDate,
    endDate: endDate,
    photoPath: photoPath,
    description: description,
    organizerName: organizerName,
  });

  event
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company.",
      });
    });
};

// Retrieve and return all events from the database.
exports.findAll = (req, res) => {
  Event.find()
    .then((events) => {
      res.send(events);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

// Find a single event with a eventId
exports.findOne = (req, res) => {
  Event.findById(req.params.eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found with id " + req.params.eventId,
        });
      }
      res.send(event);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Event not found with id " + req.params.eventId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving event with id " + req.params.eventId,
      });
    });
};

// Update a event identified by the eventId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Event title can not be empty",
    });
  }

  // Find event and update it with the request body
  Event.findByIdAndUpdate(
    req.params.eventId,
    {
      title: req.body.title,
      domain: req.body.domain,
      price: req.body.price,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      photoPath: req.body.photoPath,
      description: req.body.description,
      organizerName: req.body.organizerName,
    },
    { new: true }
  )
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found with id " + req.params.eventId,
        });
      }
      res.send(event);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Event not found with id " + req.params.eventId,
        });
      }
      return res.status(500).send({
        message: "Error updating event with id " + req.params.eventId,
      });
    });
};

// Delete a event with the specified eventId in the request
exports.delete = (req, res) => {
  Event.findByIdAndRemove(req.params.eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found with id " + req.params.eventId,
        });
      }
      res.send({ message: "Event deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Event not found with id " + req.params.eventId,
        });
      }
      return res.status(500).send({
        message: "Could not delete event with id " + req.params.eventId,
      });
    });
};

exports.findByTitle = (req, res) => {
  Event.findOne({ title: req.params.title })
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found with name " + req.params.title,
        });
      }
      res.send(event);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Event not found with name " + req.params.title,
        });
      }
      return res.status(500).send({
        message: "Error retrieving event with name " + req.params.title,
      });
    });
};

exports.findByDomain = (req, res) => {
  Event.find({ domain: req.params.domain })
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found with domain " + req.params.domain,
        });
      }
      res.send(event);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Event not found with domain " + req.params.domain,
        });
      }
      return res.status(500).send({
        message: "Error retrieving event with domain " + req.params.domain,
      });
    });
};

exports.findByLocation = (req, res) => {
  Event.find({ location: req.params.location })
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found with location " + req.params.location,
        });
      }
      res.send(event);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Event not found with location " + req.params.location,
        });
      }
      return res.status(500).send({
        message: "Error retrieving event with location " + req.params.location,
      });
    });
};

exports.findByOrganizer = (req, res) => {
  Event.find({ organizerName: req.params.organizerName })
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message:
            "Event not found with organizerName " + req.params.organizerName,
        });
      }
      res.send(event);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Event not found with organizerName " + req.params.organizerName,
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving event with organizerName " +
          req.params.organizerName,
      });
    });
};
