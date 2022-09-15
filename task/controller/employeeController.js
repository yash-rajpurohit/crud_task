const employeeObject = require('../schema/employeeSchema')
const isDate = require('../utils/datetype_check')

module.exports = {
    
     listemployee : async (req, res) => {
      
      try{
        // Query all documents in db
        await employeeObject.find({}, { __v: 0 }).sort({firstName: 1})
        .then(employees => {
          // Returning documents to client
          return res.json({
            responseCode: 200,
            responseMessage: "Department list retrieved",
            responseData: {
              total: employees.length,
              employees
            }
          });
        })
        .catch(error => {
          // Error handling
          return res.status(500).json({error});
        });
      }
      catch(error){
        return res.status(500).json({error});
      }
   },
   
   
     searchemployee: async (req, res) => {

      try{
       // Query text index firstname in db 
       // and sort the result in ascending order 
       await employeeObject.find({$text: {$search: req.query.firstName, $caseSensitive: false}}, { __v: 0 }).sort({firstName: 1})
   
       .then(employees => {
         // Returning documents to client
         return res.json({
          responseCode: 200,
            responseMessage: "Department list retrieved",
            responseData: {
              total: employees.length,
              employees
            }
         });
       })
       .catch(error => {
         // Error handling
         return res.status(500).json(error);
       });
      }
      catch(error){
        return res.status(500).json(error);
      }
   },

   createemployee: async (req, res) => {


    try{
    // Get data from request body
    const {firstName, lastName, dob, department, basicSalary, designation} = req.body;

    let datetypeflag = isDate(dob);

    if(datetypeflag == false){
      return res.status(400).json({msg: 'invalid date format'})
    }
    else{
      // Creating a new employee
    const employeeRespose = await new employeeObject({
      firstName, lastName, dob, department, basicSalary, designation
  });

  // Saving the new employee in the db
  employeeRespose
    .save()
    .then(employee_data => res.json({
          responseCode: 200,
          responseMessage: "Employee created successfully",
          responseData: {
            _id: employee_data._id,
            firstName: employee_data.firstName,
            lastName: employee_data.lastName,
            dob: employee_data.dob,
            department: employee_data.department,
            basicSalary: employee_data.basicSalary,
            designation: employee_data.designation
          }
    }))
    .catch(error => res.status(500).json(error));
    }
  
  }
  catch(error){
    return res.status(500).json(error);
  }
    
   },

   editemployee: async (req, res) => {

    try{
    // get data from request body
    const { firstName, lastName, dob, department, basicSalary, designation } = req.body;
  
    await employeeObject.findOneAndUpdate(
      // find id equals to the id from params
      { _id: { $eq: req.params.id } },
      { firstName, lastName, dob, department, basicSalary, designation }, // data which should be updated
      { new: true } // to mongoose returns the updated document
    )
      .then(employee_data => {
        return res.json({
          responseCode: 200,
          responseMessage: "Employee updated successfully",
          responseData: {
            _id: employee_data._id,
            firstName: employee_data.firstName,
            lastName: employee_data.lastName,
            dob: employee_data.dob,
            department: employee_data.department,
            basicSalary: employee_data.basicSalary,
            designation: employee_data.designation
          }
        });
      })
      .catch(error => {
        return res.status(500).json(error);
      });

    }
    
    catch(error){
      return res.status(500).json(error);
    }
   },

   deleteemployee: async (req, res) => {
    
    try{
     // Searching for a employee and deleting
     await employeeObject.findOneAndDelete({ _id: req.params.id })
     .then(employee_data => {
       // If the id of employee not exists, returns a error
       if (!employee_data) {
         return res.status(404).json({ msg: 'user not found which to be deleted' });
       }
 
       return res.json({
        responseCode: 200,
          responseMessage: "Employee deleted successfully",
          responseData: {
            
          }
       });
     })
     .catch(error => {
       // Handling the error
       return res.status(500).json(error);
     });

    }
    catch(error){
      return res.status(500).json(error);
    }
   }

};







