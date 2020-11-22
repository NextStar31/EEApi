Event = require("./eventModel");

exports.index = function (req, res) {
  Event.get(function (err, events) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }

    res.json({
      status: "success",
      data: events.map((x) => {
        return {
          id: x.id,
          date: x.date,
        };
      }),
    });
  });
};

exports.update = function (req, res) {
  console.log(req.body);
  Event.findById(req.params.coin_id, function (err, event) {
    if (err) res.send(err);
   
    event.save(function (err) {
      if (err) res.json(err);
      res.json({
        status: "success",
        data: {
          id: event.id,
          date: event.date,
        },
      });
    });
  });
};


exports.add = function (req, res) {
    var event = new Event();
    event.name = req.body.name ;

    contact.save(function (err) {
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New contact created!',
                data: contact
            });
    });
};

exports.delete = function (req, res) {
    Event.remove({
        _id: req.params.id
    }, function (err, event) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Event deleted'
        });
    });
};
