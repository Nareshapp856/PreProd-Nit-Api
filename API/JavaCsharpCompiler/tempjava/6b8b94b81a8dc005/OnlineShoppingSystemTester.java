package inhertiance_1st;

class Product
{
    protected String name;
    protected double price;
    public Product(String name,double price)
    {
        this.name=name;
        this.price=price;
    }
    public void displayInfo()
    {
        System.out.println("product : "+name);
        System.out.println("price : "+price);
    }
    public void calculateTotalCoat(int quantity)
    {
        double totalCost=price*quantity;
System.out.println("total cost : "+totalCost);
    }
}
class Electronics extends Product
{
    private String brand;
    public Electronics(String name,double price,String brand)
    {
        super(name,price);
        this.brand=brand;
    }
    public String getBrand()
    {
        return brand;
    }
    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("brand : "+getBrand());
    }
}
class Clothing extends Product
{
    private String size;
    public Clothing(String name,double price,String size)
    {
        super(name,price);
        this.size=size;
    }
    public String getSize()
    {
        return size;
    }
    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("size : "+getSize());
    }
}
public class OnlineShoppingSystemTester
{
    public static void main(String []args)
    {
Electronics e=new Electronics("tv",5500.0,"lg");
e.displayInfo();
e.calculateTotalCoat(5);
Clothing c=new Clothing("shirt",600,"medium");
c.displayInfo();
    }
}