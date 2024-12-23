class Product
{
    protected String name;
    protected double price;
    int quantity;
    Product(String name,double price)
    {
        this.name=name;
        this.price=price;
    }
    public void displayInfo()
    {
        System.out.println("name :"+name+"price :"+price);
    }
    public void calculateTotalCost(int quantity)
    {
        System.out.println("Total cost :"+(quantity*price));
    }
}
class Electronics extends Product
{
    private  String brand;
    Electronics(String name,double price,String brand)
    {
        super(name,price);
        this.brand=brand;
    }
    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("Brand is :"+brand);
    }

}
class Clothing extends Product
{
    private String size;
    Clothing(String name,double price,String size)
    {
        super(name,price);
        this.size=size;
    }
     public void displayInfo()
    {
        super.displayInfo();
        System.out.println("Size is :"+size);
    }
}
public class OnlineShoppingSystemTester
{
    Electronics e1=new Electronics("Mobile",50000,"Vivo");
    e1.displayInfo();
   // e1.calculateTotalCost(1);
    Clothing c1=new Clothing("Saree",300,"5m");
    c1.displayInfo();
    //c1.calculateTotalCost(2);
}