
const curdCompanyModel = require('../module/curd')


 async function companyGetData(req, res){
    try {
        const companies = await curdCompanyModel.find();

        res.json(companies); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
 }
 async function companyFormData (req, res){
  const { name, address, email, phone } = req.body;
  try {
      const newCompany = new curdCompanyModel({
          name,
          address,
          email,
          phone
      });
      await newCompany.save();
      res.json(newCompany); // Send back the newly created company object
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
}
async function curdDelete(req,res){
   try {
    const id = req.params.id
    let del = await curdCompanyModel.findByIdAndDelete({_id:id})
    res.send(del)
    console.log(del)
   } catch (error) {
    console.log(error)
   }
}
async function curdUpdate(req, res) {
    try {
        const id = req.params.id; 
        const dat = await curdCompanyModel.findByIdAndUpdate({_id:id},{
            name:req.body.name,
            address:req.body.address,
            email:req.body.email,
            phone:req.body.phone
        }); 
        
        res.send(dat); // Send the updated document as response
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); // Send 500 status if any error occurs
    }
}


module.exports= {companyGetData,curdDelete,curdUpdate,companyFormData}