module.exports = function(sequelize, DataTypes) 
{
    var Order = sequelize.define("Order", 
    {
      order_quatity:
      {
        type: DataTypes.INTEGER,
        isInt: true,
        min: 1,
        notEmpty: true,
        allowNull: false,
        unique: false

      },
      user_id:
      {
        type: DataTypes.STRING,
        allowNull: false
      },
      item_name:
      {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    Order.associate = function(models) {
        // We're saying that an Order should belong to a User
        // An Order can't be created without an User due to the foreign key constraint
        Order.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Order;
};