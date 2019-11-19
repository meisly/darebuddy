
module.exports = (sequelize, DataTypes) => {
    const userworkouts = sequelize.define("userworkouts", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      workoutId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'workouts',
            key: 'id'
          },
          allowNull: false
      },
      userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          },
          allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
    
    return userworkouts;
  };
  