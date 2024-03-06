const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: 'categories',
    underscored: true,
    timestamps: false,
  });
  return Category;
};

module.exports = CategoryModel;