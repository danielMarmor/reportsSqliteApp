const express = require('express');
const path = require('path');
const comp_repo = require('./repository');
const config = require('config');
const logger = require('./logger-settings');

const port = config.get('express').port;

const app = express();
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.get('/report', async(req, res)=>{
    try{
        const reports = await comp_repo.getAllReports(); 
        logger.info(reports);
        res.status(200).json({reports});
    }
    catch(err){
        logger.error(err.message);
        res.status(400).send({
            status : "fail",
            message: err.message
        });
    }
   
});

app.get('/report_search', async(req, res)=>{
    try{
        const search = req.query.search;
        const reports = await comp_repo.getAllReportsBySearch(search); 
        logger.info(reports);
        res.status(200).json({reports});
    }
    catch(err){
        logger.error(err.message);
        res.status(400).send({
            status : "fail",
            message: err.message
        });
    }
   
});

app.get('/report/:report_id', async(req, res)=>{
    try{
        const report_id = req.params.report_id;
        const report = await comp_repo.getReportById(report_id);
        logger.info(report);
        res.status(200).json({report});
    }
    catch(err){
        logger.error(err.message);
        res.status(400).send({
            status : "fail",
            message: err.message
        });
    }

});

app.post('/report', async(req, res)=>{
    try{
        const report = req.body;
        const result = await comp_repo.addReport(report);
        logger.info(result);
        res.status(201).send({
            res : 'Success',
            url : `localhost:8080/company/${report.ID}`,
            result
        });
    }
    catch(err){
        logger.error(err.message);
        res.status(400).send({
                status : "fail",
                message: err.message
        });
    }

});


app.put('/report/:report_id', async(req, res)=>{
    try{
        const report_id =req.params.report_id;
        const report = req.body;
        const result = await comp_repo.updateReport(report_id, report);
        logger.info(result);
        res.status(201).send({
            res : 'Success',
            url : `localhost:8080/company/${report_id}`,
            result
        });

    }
    catch(err){
        logger.error(err.message);
        res.status(400).send({
                status : "fail",
                message: err.message
        });
    }
   


});

app.delete('/report/:report_id', async(req, res)=>{
    try{
        const report_id = req.params.report_id;
        const result = await comp_repo.deleteReport(report_id);
        res.status(201).json({
            res: 'success',
            url: `localhost:8080/company/${report_id}`,
            result
        })
    }
    catch(err){
        logger.error(err.message);
        res.status(400).send({
            status : "fail",
            message: err.message
        });
    }
});

//-------

app.listen(port, ()=>{
    logger.info(`Listening to port ${port}`);
});



