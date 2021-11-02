var Db  = require('./dboperations');
var Order = require('./order');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

router.route('/sensors').get((request,response)=>{

    dboperations.getOrders().then(result => {
	   if (result[0].length) {		
       response.json({"message":"success", "status": 200, "data":result[0]});
	   } else {
		   response.status(500).json({
          "status": 500, message: "Some error occurred while retrieving sensors"
        });
	   }
    })

})

router.route('/sensors/:id').get((request,response)=>{

    dboperations.getOrder(request.params.id).then(result => {
	   if (result[0].length) {
		response.json({"message":"success", "status": 200, "data":result[0]});
      } else {
        response.status(404).json({
          "status": 404, message: "Cannot find Sensors."
        });
	  }
       
    })

})

router.route('/sensors').post((request,response)=>{

    let order = {...request.body}

    dboperations.addOrder(order).then(result => {
	   if (result) {
		response.json({"message":"Sensors was inserted successfully", "status": 200});
      } else {
        response.status(404).json({
          "status": 404, message: "Cannot insert Sensors!"
        });
	  }
    })

})

router.route('/sensors/:id').put((request,response)=>{

    let order = {...request.body}

    dboperations.updateOrder(order, request.params.id).then(result => {
       if (result) {
		response.json({"message":"Sensors was updated successfully", "status": 200, "data":result});
      } else {
        response.status(404).json({
          "status": 404, message: "Cannot update Sensors. Maybe Sensors was not found or req.body is empty!"
        });
	  }
    })

})

router.route('/sensors/:id').patch((request,response)=>{

    let order = {...request.body}

    dboperations.patchOrder(order, request.params.id).then(result => {
       if (result) {
		response.json({"message":"Sensors was updated successfully", "status": 200, "data":result});
      } else {
        response.status(404).json({
          "status": 404, message: "Cannot update Sensors. Maybe Sensors was not found or req.body is empty!"
        });
	  }
    })

})

router.route('/sensors/:id').delete((request,response)=>{


    dboperations.deleteOrder(request.params.id).then(result => {
       if (result) {
		response.json({"message":"Sensors was deleted successfully!", "status": 200, "data":result});
      } else {
        response.status(404).json({
          "status": 404, message: "Cannot delete Sensors. Maybe Sensors was not found!"
        });
	  }
    })

})




var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);



