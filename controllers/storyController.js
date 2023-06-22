const res = require("express/lib/response");
const model = require("../models/story");

exports.index = (request, response, next) => {
  model
    .find()
    .then((stories) => {
      const TMapping = stories.reduce((group, product) => {
        group[product.tradeitemcategory] =
          group[product.tradeitemcategory] ?? [];
        group[product.tradeitemcategory].push(product);
        return group;
      }, {});
      response.render("./story/trades", { TMapping });
    })
    .catch((error) => next(error));
};

exports.new = (request, response) => {
  response.render("./story/newTrade");
};

exports.create = (request, response, next) => {
  let story = new model(request.body);
  story.author = request.session.user;
  story.image1 = request.files.sampleImage1[0].originalname;
  story.image2 = request.files.sampleImage2[0].originalname;
  story
    .save()
    .then((story) => {
      response.redirect("/trades");
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        error.status = 400;
      }
      next(error);
    });
};

exports.show = (request, response, next) => {
  let id = request.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let error = new Error("Invalid story id");
    error.status = 400;
    return next(error);
  }
  model
    .findById(id)
    .then((story) => {
      if (story) {
        response.render("./story/trade", { story });
      } else {
        let error = new Error("No story found with id " + id);
        error.status = 400;
        next(error);
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.edit = (request, response, next) => {
  let id = request.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let error = new Error("Invalid story id");
    error.status = 400;
    return next(error);
  }
  model
    .findById(id)
    .then((story) => {
      if (story) {
        response.render("./story/editTrade", { story });
      } else {
        let error = new Error("No story found with id " + id);
        error.status = 404;
        next(error);
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.update = (request, response, next) => {
  let story = request.body;
  let id = request.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let error = new Error("Invalid story id");
    error.status = 400;
    return next(error);
  }
  story.author = request.session.user;
  story.image1 = request.files.sampleImage1[0].originalname;
  story.image2 = request.files.sampleImage2[0].originalname;
  model
    .findByIdAndUpdate(id, story, {
      useFindAndModify: false,
      runValidators: true,
    })
    .then((tradeDetail) => {
      if (tradeDetail) {
        response.redirect("/trades/" + id);
      } else {
        let error = new Error("No story found with id " + id);
        error.status = 404;
        next(error);
      }
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        error.status = 400;
      }
      next(error);
    });
};

exports.delete = (request, response, next) => {
  let id = request.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let error = new Error("Invalid story id");
    error.status = 400;
    return next(error);
  }
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let error = new Error("Invalid story id");
    error.status = 400;
    return next(error);
  }
  model
    .findByIdAndDelete(id, { useFindAndModify: false })
    .then((trade) => {
      if (trade) {
        response.redirect("/trades");
      } else {
        let error = new Error("No story found with id " + id);
        error.status = 404;
        next(error);
      }
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        error.status = 400;
      }
      next(error);
    });
};
