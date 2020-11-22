// contactController.js
// Import contact model
Coin = require("./speakerModel");
// Handle index actions
exports.index = function (req, res) {
  Coin.get(function (err, coins) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }

    res.json({
      status: "success",
      data: coins.map((x) => {
        return {
          id: x.id,
          coinId: x.coinId,
          quantity: x.quantity[0],
          cost: x.cost[0],
          medianBuy: x.medianBuy[0],
          date: x.date[0],
        };
      }),
    });
  });
};

// Handle view coins info
exports.view = function (req, res) {
  Coin.findById(req.params.coin_id, function (err, coin) {
    if (err) res.send(err);
    res.json({
      message: "Contact details loading..",
      data: coin,
    });
  });
};

// Handle update contact info
exports.buyBatch = function (req, res) {
  console.log(req.body);
  req.body.forEach((element) => {
    Coin.findById(element.id, function (err, coin) {
      if (err) res.send(err);

      const price = element.value / element.quantity;
      const cost = coin.cost[0] + element.value;
      const quantity = coin.quantity[0] + element.quantity;
      const medianBuy = cost / quantity;
      const value = quantity * price;
      const gain = 100 * (value / cost - 1);
      const date = Date.now();
      coin.price = [price, ...coin.price];
      coin.value = [value, ...coin.value];
      coin.gain = [gain, ...coin.gain];
      coin.quantity = [quantity, ...coin.quantity];
      coin.cost = [cost, ...coin.cost];
      coin.medianBuy = [medianBuy, ...coin.medianBuy];
      coin.date = [date, ...coin.date];
      coin.save(function (err) {
        if (err) res.json(err);
      });
    });
  });

  res.json({
    status: "success",
  });
};

exports.update = function (req, res) {
  console.log(req.body);
  Coin.findById(req.params.coin_id, function (err, coin) {
    if (err) res.send(err);
    const element = req.body;
    const price = element.price;
    const cost = element.cost;
    const quantity = element.quantity;
    const medianBuy = cost / quantity;
    const value = quantity * price;
    const gain = 100 * (value / cost - 1);
    const date = Date.now();
    coin.price = [price, ...coin.price];
    coin.value = [value, ...coin.value];
    coin.gain = [gain, ...coin.gain];
    coin.quantity = [quantity, ...coin.quantity];
    coin.cost = [cost, ...coin.cost];
    coin.medianBuy = [medianBuy, ...coin.medianBuy];
    coin.date = [date, ...coin.date];

    coin.save(function (err) {
      if (err) res.json(err);
      res.json({
        status: "success",
        data: {
          id: coin.id,
          coinId: coin.coinId,
          quantity: coin.quantity[0],
          cost: coin.cost[0],
          value: coin.value[0],
          gain: coin.gain[0],
          medianBuy: coin.medianBuy[0],
          date: coin.date[0],
        },
      });
    });
  });
};

/*// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
// save the contact and check for errors
    contact.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New contact created!',
                data: contact
            });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Coin.findById(req.params.coin_id, function (err, coin) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: coin
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};*/
