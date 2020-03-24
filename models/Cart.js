// Creating our Cart model
module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define("Cart", {
      // item name cannot be null
      item_name: 
      {
        type: DataTypes.STRING,
        allowNull: false,
        debug: true
      },
      // The quantity cannot be null or less than one
      item_quantity: 
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1
      },
      item_price: 
      {
        type: DataTypes.FLOAT,
        allowNull: false,
        min: 1
      }
    });
    Cart.associate = function(models) {
      // We're saying that an Order should belong to a User
      // An Order can't be created without an User due to the foreign key constraint
      Cart.belongsTo(models.User, {
          foreignKey: {
          allowNull: false
        }
      });
    };
    return Cart;
  };