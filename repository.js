const connectedKnex = require('./knex-connector');

function getAllReports() {
    return connectedKnex('REPORT').select('*');
}

function getAllReportsBySearch(search) {
    return connectedKnex('REPORT').where('LICENCE_PLATE', 'like', `%${search}%`).select('*');
}

async function getReportById(id) {
    var report = await connectedKnex('REPORT').select('*').where('ID', id).first();
    if (!report){
        throw Error('Report Not Found!');
    }
    return report;
}

function addReport(report) {
    return connectedKnex("REPORT").insert(report);
}

async function updateReport(id, updatedReport) {
    var report = await connectedKnex('REPORT').select('*').where('ID', id).first();
    if (!report){
        throw Error('Report Not Found!');
    }
    return connectedKnex("REPORT").where('ID', id).update(updatedReport);
}

async function deleteReport(id) {
    var report =  await connectedKnex('REPORT').select('*').where('ID', id).first();
    if (!report){
        throw Error('Report Not Found!');
    }
    return connectedKnex("REPORT").where('ID', id).del()
}

module.exports = {
    getReportById,
    getAllReports,
    getAllReportsBySearch,
    addReport,
    updateReport,
    deleteReport
}