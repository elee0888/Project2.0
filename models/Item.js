//API request goes here?
module.exports = function(sequelize, DataTypes) 
{
    var Item = sequelize.define("Item", 
    {
      item_name: 
      {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      item_catalog_number:
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      item_description:
      {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      category_id:
      {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      item_price:
      {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: false
      },
      item_quantity:
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      }
    });

    Item.associate = function(models) {
        // We're saying that an Item should belong to a Categorey
        // An Item can't be created without an Category due to the foreign key constraint
        Item.belongsTo(models.Category, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Item;
};