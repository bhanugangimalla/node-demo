class Order{
    constructor(CustomerID,FirstName,CompanyName,Phone,EmailAddress){
        this.CustomerID = CustomerID; 
        this.FirstName = FirstName; 
        this.CompanyName = CompanyName;
        this.Phone = Phone;
        this.EmailAddress = EmailAddress; 
    }
}

module.exports = Order;
