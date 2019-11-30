
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
      notes: {
          type: DataTypes.TEXT
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
    userworkouts.associate = function (models) {
      userworkouts.belongsTo(models.users, {
        onDelete: "cascade"
      });

      userworkouts.belongsTo(models.workouts, {
          onDelete: 'cascade'
      });
    };
    return userworkouts;
  };
  