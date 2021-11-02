class Order{
    constructor(Id,SensorName,Unit,LocationName,Temperature,Humidity){
        this.Id = Id; 
        this.SensorName = SensorName; 
        this.Unit = Unit;
		this.LocationName = LocationName;
        this.Temperature = Temperature;
        this.Humidity = Humidity; 
    }
}

module.exports = Order;
