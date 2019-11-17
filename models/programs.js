

module.exports = (sequelize, DataTypes) => {
    const programs = sequelize.define("programs", {
      programName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }, 
      focus: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      equipment: {
        type: DataTypes.STRING,
        len: [1, 55],
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      imageUrl: {
          type: DataTypes.STRING,
          allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        len: [1, 55],
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      length: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      difficulty: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    programs.associate = function(models) {
        programs.hasMany(models.workouts, {});
    };
    return programs;
  };
  