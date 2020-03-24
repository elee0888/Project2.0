module.exports = function(sequelize, DataTypes) 
{
    var Category = sequelize.define("Category", 
    {
      category_name:
      {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
      }
      
    },
    {
      timestamps: false,
    }); 
    
    return Category;
};