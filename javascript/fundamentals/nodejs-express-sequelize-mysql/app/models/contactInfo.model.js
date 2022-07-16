const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const ContactInfo = sequelize.define("contact_info", {
        phone: {
            type: Sequelize.STRING
        }
    });
    return ContactInfo;
}