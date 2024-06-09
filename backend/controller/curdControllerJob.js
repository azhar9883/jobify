
const curdCompanyModelJob = require('../module/curdJob')


async function companyGetDataJob(req, res) {
    try {
        const companies = await curdCompanyModelJob.find();

        res.json(companies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function companyFormDataJob(req, res) {
    const { title, description, company, location, salary } = req.body;
    try {
        const newCompany = new curdCompanyModelJob({
            title,
            description,
            company,
            location,
            salary
        });
        await newCompany.save();
        res.json(newCompany); // Send back the newly created company object
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function curdDeleteJob(req, res) {
    try {
        const id = req.params.id
        let del = await curdCompanyModelJob.findByIdAndDelete({ _id: id })
        res.send(del)
        console.log(del)
    } catch (error) {
        console.log(error)
    }
}
async function curdUpdateJob(req, res) {
    try {
        const id = req.params.id;
        const dat = await curdCompanyModelJob.findByIdAndUpdate({ _id: id }, {
            title: req.body.title,
            description: req.body.description,
            company: req.body.company,
            location: req.body.location,
            salary: req.body.salary
        });

        res.send(dat); // Send the updated document as response
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); // Send 500 status if any error occurs
    }
}


module.exports = { companyGetDataJob, curdDeleteJob, curdUpdateJob, companyFormDataJob }