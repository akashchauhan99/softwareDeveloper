const { NOW } = require('sequelize')
const Sequelize = require('sequelize')

const db = new Sequelize('shopdb', 'root', '', {
   host: 'localhost',
   dialect: 'mysql',
   pool: {
      min: 0,
      max: 5
   }
})

const User = db.define('users', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false
   }
})

const Product = db.define('products', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false
   },
   manufacturor: Sequelize.STRING,
   price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.0
   }
})

const Order = db.define('orders', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false
   },
   price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.0
   },
   date: {
      type: Sequelize.DATE,
      allowNull: false,
      default: NOW()
   }
})

const OrderDetail = db.define('orderDetails', {
   name: {
      type: Sequelize.STRING,
      allowNull: false
   }
})

User.hasMany(Order)
Order.belongsTo(User, {
   foreignKey: 'id',
   as: 'usrId'
})

Order.hasMany(OrderDetail)
OrderDetail.belongsTo(Order, {
   foreignKey: 'id',
   as: 'orderid'
})

db.sync()
   .then(() => {
      console.log('Database has been synced')
   })
   .catch((err) => {
      console.log('Error Creating database', err.message)
   })

exports = module.exports = {
   User,
   Product,
   Order,
   OrderDetail
}
