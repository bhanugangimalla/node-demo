var config = require('./dbconfig');
const sql = require('mssql');


async function getOrders() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from [dbo].[Sensors]");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getOrder(orderId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, orderId)
            .query("SELECT * from [dbo].[Sensors] where Id = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function addOrder(order) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
			.query("INSERT INTO [dbo].[Sensors](SensorName, Unit, LocationName, Temperature, Humidity) VALUES ('"+order.SensorName+"','"+order.Unit+"','"+order.LocationName+"','"+order.Temperature+"', '"+order.Humidity+"')")
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function updateOrder(order, orderId) {

    try {
		console.info('order.........', order)
		console.info('order.........orderId....', orderId)
        let pool = await sql.connect(config);
        let updateProduct = await pool.request()
			.input('input_parameter', sql.Int, orderId)
			.query("UPDATE [dbo].[Sensors] SET SensorName='"+order.SensorName+"', Unit='"+order.Unit+"', LocationName='"+order.LocationName+"', Temperature='"+order.Temperature+"', Humidity='"+order.Humidity+"' WHERE Id= @input_parameter")
        return updateProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function patchOrder(order, orderId) {

    try {
		console.info('order.........', order)
		console.info('order.........orderId....', orderId)
        let pool = await sql.connect(config);
        let updateProduct = await pool.request()
			.input('input_parameter', sql.Int, orderId)
			.query("UPDATE [dbo].[Sensors] set SensorName = COALESCE(?,SensorName), Unit = COALESCE(?,Unit), LocationName = COALESCE(?,LocationName), Temperature = COALESCE(?,Temperature), Humidity = COALESCE(?,Humidity) WHERE Id = ?",[order.SensorName, order.Unit, order.LocationName, order.Temperature, order.Humidity, orderId])
        return updateProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}


async function deleteOrder(orderId) {

    try {
		console.info('order.........orderId....', orderId)
        let pool = await sql.connect(config);
        let updateProduct = await pool.request()
			.input('input_parameter', sql.Int, orderId)
			.query("DELETE FROM [dbo].[Sensors] WHERE Id= @input_parameter")
        return updateProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}





module.exports = {
    getOrders: getOrders,
    getOrder : getOrder,
    addOrder : addOrder,
	updateOrder : updateOrder,
	patchOrder : patchOrder,
	deleteOrder : deleteOrder
}