public class OnlineShoppingSystemTester
{
   protected String name;
   protected double price;
public OnlineShoppingSystemTester(String name,double price)
{
    this.name=name;
    this.price=price;
} 
public void displayInfo()
{
    System.out.println("name is:"+name);
    System.out.println("price is :"+price);
}
public void calculateTotalCost(int quantity)
{
    total=price*quantity;
    System.out.println("total is:"+total);
}
}
class Electronics extends OnlineShoppingSystemTester
 
{
    private String brand;
    public Electronics(String name,double price,String brand)
    {
        this.brand=brand;
    }
    public void displayInfo()
    {
        Systm.out.println("brand is:"+brand);
    }
}
class Clothing extends OnlineShoppingSystemTester
 
{
    private String size;
    public Clothing(String name,double price,String size)
    {
        this.size=size;
    }
    public void displayInfo()
    {
        System.out.println("size is:"+size);
    }
}
public class Product
{
    public static void main(String[] args)
    {
        Electronics electronic=new Electronics("gas",24000,"india");
        Clothing clothing=new Clothing("T-shirt",1200,"medium");
        electronic.displayInfo();
        elecronic.calculateTotalCost(5);
    
        clothing.displayInfo();
    }
}
