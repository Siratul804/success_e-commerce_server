const Service = require("../models/service");

exports.postService = async (req, res) => {
  const { name, price, description } = req.body;

  const id = Math.random().toString(26).slice(2);

  const newService = new Service({
    id: id,
    name: name,
    price: price,
    description: description,
    image: req.file.originalname,
  });

  console.log(id, name, price, description);

  newService
    .save()
    .then(() => res.json("Service Added"))
    .catch((err) => res.status(400).json(`Error:${err}`));
};
exports.getService = async (req, res) => {
  Service.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
exports.deleteService = async (req, res) => {
  const id = req.params.id;
  await Service.findByIdAndRemove(id).exec();
  res.send({ msg: "Service deleted" });
};
exports.updateServiceImg = async (req, res) => {
  Service.findOneAndUpdate(
    { _id: req.params.id },
    {
      image: req.file.originalname,
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(data);
        console.log(data);
      }
    }
  );
};
exports.updateServiceText = async (req, res) => {
  const { newName, newPrice, newDescription } = req.body;
  console.log(newName, newDescription, newPrice);

  Service.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: newName,
      price: newPrice,
      description: newDescription,
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(data);
        console.log(data);
      }
    }
  );
};
