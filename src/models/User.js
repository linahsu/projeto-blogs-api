const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    displayName: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(255),
    },
    password: {
      type: DataTypes.STRING(255),
    },
    image: {
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'blogPosts'
    });
  }

  return User;
};

module.exports = UserModel;