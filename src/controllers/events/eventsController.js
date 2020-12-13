Event = require("./eventModel");

exports.index = function (req, res) {
  Event.get(function (err, events) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }

    const sortedEvents = events.slice().sort((a, b) => a.date - b.date);
    const filteredEvents = sortedEvents.filter(event => event.date > Date.now());

    res.json({
      status: "success",
      data: filteredEvents.map((x) => {
        return {
          id: x.id,
          date: x.date,
          start: x.start,
          end: x.end,
          title: x.title,
          theme: x.theme,
          desciption: x.desciption,
          uri: x.uri,
          speakers: x.speakers,
          isSpecialEvent: x.isSpecialEvent,
        };
      }),
    });
  });
};

exports.update = function (req, res) {
  console.log(req.body);
  Event.findById(req.params.id, function (err, event) {
    if (err) res.send(err);
    const data = req.body;
    event.date = data.date;
    event.start = data.start;
    event.end = data.end;
    event.eventDay = data.eventDay;
    event.title = data.title;
    event.theme = data.theme;
    event.desciption = data.desciption;
    event.uri = data.uri;
    event.speakers = data.speakers;
    event.isSpecialEvent = data.isSpecialEvent;

    event.save(function (err) {
      if (err) res.json(err);
      res.json({
        status: "success",
        data: {
          id: data.id,
          date: data.date,
          start: data.start,
          end: data.end,
          eventDay: data.eventDay,
          title: data.title,
          theme: data.theme,
          desciption: data.desciption,
          uri: data.uri,
          speakers: data.speakers,
          isSpecialEvent: data.isSpecialEvent,
        },
      });
    });
  });
};

exports.add = function (req, res) {
  var event = new Event();
  const data = req.body;
  event.date = data.date;
  event.start = data.start;
  event.end = data.end;
  event.eventDay = data.eventDay;
  event.title = data.title;
  event.theme = data.theme;
  event.desciption = data.desciption;
  event.uri = data.uri;
  event.speakers = data.speakers;
  event.isSpecialEvent = data.isSpecialEvent;

  contact.save(function (err) {
    if (err) res.json(err);
    else
      res.json({
        message: "New event created!",
        data: event,
      });
  });
};

exports.delete = function (req, res) {
  Event.remove(
    {
      _id: req.params.id,
    },
    function (err, event) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Event deleted",
      });
    }
  );
};
