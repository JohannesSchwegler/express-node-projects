/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function(app) {
  var convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function(req, res) {
    var input = req.query.input;
    if(!isNaN(input)){
        res.send("Invalid");
    }
    
    var initNum = convertHandler.getNum(input);
    if (initNum === undefined || initNum === 'NaN') {
      res.send("Invalid num");
    }
    var initUnit = convertHandler.getUnit(input);
    if (initUnit === undefined) {
      res.send("Invalid unit");
    }

    var returnNum = convertHandler.convert(initNum, initUnit);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    var toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.send(toString);

   // console.log(toString);
   
  });
};
