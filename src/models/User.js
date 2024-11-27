// src/models/User.js
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 30],
          notEmpty: true,
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.VIRTUAL,
        validate: {
          len: [6, 30],
        },
        set(value) {
          // Armazena o valor não criptografado para uso no hook
          this.setDataValue('password', value);
          // Gera o hash imediatamente
          this.setDataValue('password_hash', bcrypt.hashSync(value, 10));
        }
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'users',
    });
  }

  // Method to check password
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  // Remove sensitive data when converting to JSON
  toJSON() {
    const values = { ...this.get() };
    delete values.password_hash;
    delete values.password;
    return values;
  }
}

module.exports = User;