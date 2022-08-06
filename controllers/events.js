const { response } = require("express");

const Event = require("../models/Event");

const getEvents = async (req, res = response, next) => {
  const events = await Event.find().populate("user", "name");
  res.status(201).json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response, next) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();

    res.status(201).json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact your administrator",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;

  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Can´t find the information",
      });
    }

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "Unauthorized",
      });

    const newInfo = {
      ...req.body,
      user: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newInfo, {
      new: true,
    });

    res.json({ ok: true, event: updatedEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact your administrator",
    });
  }
};

const deleteEvent = async (req, res = response, next) => {
  const eventId = req.params.id;

  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Can´t find the information",
      });
    }

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "Unauthorized",
      });

    await Event.findByIdAndDelete(eventId);

    res.json({ ok: true, msg: "Event deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact your administrator",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
