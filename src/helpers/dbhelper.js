const db = require('../config/database.js');

const getData = async (tabla) => {
    try {
        const [rows] = await db.query('SELECT * FROM ??', [tabla]);
        return rows;
    } catch (error) {
        console.error("Error en getData:", error);
        throw error;
    }
};

const sendData = async (query, values) => {
    try {
        const [result] = await db.query(query, values);
        return result;
    } catch (error) {
        console.error("Error en sendData:", error);
        throw error;
    }
};

const getID = async (table, field, value) => {
    try {
        const [rows] = await db.query('SELECT id FROM ?? WHERE ?? = ?', [table, field, value]);
        if (rows.length === 0) {
            throw new Error('No hay registros con esos datos.');
        }
        return rows[0].id;
    } catch (error) {
        console.error("Error en getID:", error);
        throw error;
    }
};

const checkExists = async (tabla, campo, valor) => {
    try {
        const [rows] = await db.query('SELECT COUNT(*) as count FROM ?? WHERE ?? = ?', [tabla, campo, valor]);
        return rows[0].count > 0;
    } catch (error) {
        console.error("Error en checkExists:", error);
        throw error;
    }
};

module.exports = { getData, sendData, getID, checkExists };