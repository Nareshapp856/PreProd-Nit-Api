class Product {
    protected String name;
    protected double price;
    Product(String name,double price){
        this.name=name;
        this.price=price;
    }
    public void displayInfo(){
        System.out.println("Name of Product "+product+" Price of Product "+price);
    }
    public double calculateTotalCost(int quantity){
        price=price*quantity;
        return price;
    }
}
class Electronics extends Product{
    private String brand;
    Electronics(String name,double price,String brand){
        super(name,price);
    }
}