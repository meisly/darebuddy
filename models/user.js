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
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        profileUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
            default: ""
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
        users.belongsToMany(models.programs, {
            through: "UserPrograms",
            onDelete: "cascade"
        });
        users.belongsToMany(models.workouts, {
            through: {model: models.userworkouts, unique: false},
            onDelete: "cascade"
        });
        users.belongsToMany(models.users, { 
            as: 'Friends',
            through: 'UserFriends'
        });
    };

    return users;
};
