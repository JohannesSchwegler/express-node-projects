/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
  this.getNum = function(input) {
    var result = parseInt(input.match(/[a-z]+|[^a-z]+/gi)[0]);

    if (typeof result !== "number" || isNaN(result)) {
      result = undefined;
    }
   //console.log(result);
    return result;
  };

  this.getUnit = function(input) {
    var result = input.match(/[a-z]+|[^a-z]+/gi)[1];
     switch (result.toLowerCase()) {
      case "l":
        result = "l";
        break;
      case "gal":
        result = "gal";
        break;
      case "lbs":
        result = "lbs";
        break;
      case "kg":
        result = "kg";
        break;
      case "mi":
        result = "mi";
        break;
      case "km":
        result = "km";
        break;
      default:
        result = undefined;
    }
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    var result;
    switch (initUnit.toLowerCase()) {
      case "l":
        result = "gal";
        break;
      case "gal":
        result = "l";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      default:
        result = undefined;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    var result;
    switch (initUnit) {
      case "l":
        result = initNum / galToL;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
     return  {initNum, initUnit, returnNum, returnUnit, string:`${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`}
   
  };
}

module.exports = ConvertHandler;
