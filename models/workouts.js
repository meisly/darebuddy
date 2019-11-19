
module.exports = (sequelize, DataTypes) => {
    const workouts = sequelize.define("workouts", {
      workoutName: {
        type: DataTypes.STRING,
        len: [1, 75],
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      workoutType: {
        type: DataTypes.STRING,
        len: [1, 25],
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      focus: {
          type: DataTypes.STRING,
          len: [1, 25],
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      difficulty: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      equipment: {
          type: DataTypes.STRING,
          len: [1, 25],
          allowNull: false
      },
      program_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      imageUrl: {
          type: DataTypes.STRING,
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
    workouts.associate = function (models) {
      workouts.belongsTo(models.programs, {
        onDelete: "cascade"
      });

      workouts.belongsToMany(models.users, {
          through: 'UserWorkouts',
          onDelete: 'cascade'
      });
    };
    return workouts;
  };
  