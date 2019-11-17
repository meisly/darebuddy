module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        userName: {
            type: DataTypes.STRING,
            len: [1, 75],
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            len: [1, 75],
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        profileUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
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

    users.associate = function (models) {
        users.hasMany(models.programs, {
            onDelete: "cascade"
        });
    };
    users.associate = function (models) {
        users.hasMany(models.workouts, {
            through: 'UsersWorkouts',
            onDelete: "cascade"
        });
    };
    users.associate = function (models) {
        users.belongsToMany(models.users, { 
            as: 'Friends',
            through: 'UserFriends'
        });
    };

    return users;
};
