"use strict";
module.exports = function(sequelize, DataTypes) {
  var link = sequelize.define("link", {
    urlLong: DataTypes.STRING,
    urlShort: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return link;
};