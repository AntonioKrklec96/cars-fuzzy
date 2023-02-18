const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const { User } = require("./models/user");
const { Car } = require("./models/car");
const { auth } = require("./middleware/auth");
const res = require("express/lib/response");
const req = require("express/lib/request");

app.use(bodyParser.json());
app.use(cookieParser());

//load data - funkcija prenosi podatke iz json datoteke u bazu te se koristi samo jednom odmah nakon kreiranja prazne baze da bi se baza populirala s dummy podatcima,
//uz to funkcija dodaje polje u bazi za svakog člana koje se koristi u izvršavanju funkcije Car.fuzzySearch
/*
const data = require("./data/VehicleInfo.json");
const dataFormatted = data.map(({ _id, ...keepAttrs }) => keepAttrs);

dataFormatted.forEach(function (v) {
  const car = new Car(v);
  car.save();
});
*/
// GET //

//dohvati pojedinačni auto iz baze po id-u
app.get("/api/getCar", (req, res) => {
  let id = req.query.id;
  Car.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

//dohvati sve aute iz baze koji zadovoljavaju parametre te u slučaju da se u zahtjevu nalazi parametar za pretraživanje izvrši fuzzy search po tom parametru
app.get("/api/getCars", (req, res) => {
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;
  let search = req.query.search;
  if (search)
    Car.fuzzySearch(search)
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
      });
  else
    Car.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
      });
});

app.get("/api/logout", auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

app.get("/api/auth", auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
  });
});

// POST //

//dodaj novi auto u bazu, ako isti već postoji vrati poruku
app.post("/api/car", (req, res) => {
  const carNew = new Car(req.body);
  Car.findOne(
    {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
    },
    (err, car) => {
      if (car) {
        return res.json({
          isUnique: false,
          message: "Car already exists",
        });
      } else {
        carNew.save((err, doc) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({
            post: true,
            carId: doc._id,
          });
        });
      }
    }
  );
});
// spremi korisnika u bazu
app.post("/api/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false });
    res.status(200).json({ success: true, user: doc });
  });
});
// prijavi korisnika, ako ne postoji registrirani korisnik s primljenim parametrima vrati poruku
app.post("/api/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        isAuth: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: "Wrong password",
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("auth", user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email,
        });
      });
    });
  });
});

// DELETE //
// obriši auto iz baze po id-u
app.delete("/api/delete_car", (req, res) => {
  let id = req.query.id;

  Car.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(true);
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server up");
});
