class Product 
{
    protected String name;
    protected double price;
    Product(String name,double price)
{
   this.name=name;
   this.price=price;
}
public void displayInfo()
{
    System.out.println("product name:"+name);
    System.out.println("product price: "+price);
}
public double calculateTotalCost(int quantity)
{
    double totalcost=quantity*price;
    return totalcost;
    System.out.println("total cost:"+totalcost);
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
   public  void displayInfo()
   {
     super.displayInfo();
     System.out.println("brand:"+brand);
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
    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("size:"+size);

    }
}
public class OnlineShoppingSystemTester 
{
    public static void main(String [] args)
    {
        Electronics e=new Electronics("mobile",30000.0,"vivo");
        e.displayInfo();
        Clothing c=new Clothing("dress",200.0,"2meters");
        c.displayInfo();
    }
}