module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define("Category", {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      }
    });
    category.associate = models =>{
       category.hasMany(models.Property_Detail,
        {
           foreignKey:'categoryId'
       }
       )
      }
    return category;
  };
  
