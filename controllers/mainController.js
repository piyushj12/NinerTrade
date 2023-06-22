const express = require("express"); //import modules to controller

exports.about = (request, response) => {
  response.render("about");
};

exports.contact = (request, response) => {
  response.render("contact");
};
