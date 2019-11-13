

module.exports = (sequelize, DataTypes) => {
    const workouts = sequelize.define("workouts", {
      workout_name: {
        type: DataTypes.STRING,
        len: [1, 75],
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      workout_type: {
        type: DataTypes.STRING,
        len: [1, 25],
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      program_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
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
    workouts.associate = function (models) {
      workouts.belongsTo(models.programs, {
        onDelete: "cascade"
      });
    };
    return workouts;
  };
  