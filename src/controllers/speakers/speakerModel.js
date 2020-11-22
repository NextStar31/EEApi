var mongoose = require("mongoose");
// Setup schema
var speakerSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  uri:{
    type: String,
  },
  description:{
    type: String,
  }
});
var Speaker = (module.exports = mongoose.model("speakers", speakerSchema, "speakers"));
module.exports.get = function (callback, limit) {
  Speaker.find(callback).limit(limit);
};
