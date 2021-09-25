const Oder = require("../models/oder");

exports.createOder = (req, res) => {
  const { name, price, quanity, total, pname, email, phone, address, special } =
    req.body;

  console.log(name, price, quanity, total);

  const newOder = new Oder({
    Name: name,
    Price: price,
    Quanity: quanity,
    Total: total,
    PName: pname,
    Email: email,
    Phone: phone,
    Address: address,
    Special: special,
  });

  console.log(newOder);

  newOder
    .save()
    .then(() => res.json(newOder))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};
exports.getOder = (req, res) => {
  Oder.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

exports.deleteOder = async (req, res) => {
  const id = req.params.id;
  await Oder.findByIdAndRemove(id).exec();
  res.send({ msg: "Oder deleted" });
};
