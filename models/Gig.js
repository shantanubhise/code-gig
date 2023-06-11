const { Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');

const Gig = db.define('gig', {
    title: {
        type: DataTypes.STRING,
    },
    technologies: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING(1024),
    },
    budget: {
        type: DataTypes.STRING,
    },
    contact_email: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'gigs'
});

module.exports = Gig;