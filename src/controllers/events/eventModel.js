var mongoose = require("mongoose");
// Setup schema
var eventSchema = mongoose.Schema({
  date: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  eventDay: {
    type: String,
  },
  title: {
    type: String,
  },
  theme:{
    type: String,
  },
  desciption:{
    type: String,
  },
  uri: {
    type: String,
  },
  speakers: {
    type: Array,
  },
  isSpecialEvent: {
    type: Boolean,
  },
});

var Event = (module.exports = mongoose.model("events", eventSchema, "events"));
module.exports.get = function (callback, limit) {
  Event.find(callback).limit(limit);
};
