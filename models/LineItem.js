// "lineNumber": 1,
// "itemDesc": "cellphone",
// "unitPrice": 100,
// "quatity": 3,
// "subTotal": 300
// Creating our Cart model
module.exports = function(sequelize, DataTypes) {
    var LineItem = sequelize.define("LineItem", {
      // item name cannot be null
      lineNumber: 
      {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // The quantity cannot be null or less than one
      itemDesc: 
      {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unitPrice: 
      {
        type: DataTypes.FLOAT,
        allowNull: false
        //min: 1
      },
      quantity:
      {
        type: DataTypes.FLOAT,
        allowNull: false,
        min: 1
      },
      subTotal:
      {
        type: DataTypes.FLOAT,
        allowNull: false
      }
      
    });
    // LineItem.associate = function(models) {
    //   // We're saying that an Order should belong to a User
    //   // An Order can't be created without an User due to the foreign key constraint
    //   LineItem.belongsTo(models.Cart, {
    //       foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
    return LineItem;
  };