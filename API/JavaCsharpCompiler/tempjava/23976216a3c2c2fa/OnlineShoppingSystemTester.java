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
        System.out.println("Product name is :"+name);
        System.out.println("Product price is :"+price);
    }
    public double calculateTotalCost(int quantity)
    {
        return price*quantity;
    }

}
class Electronics extends Product
{
    private String brand;
    public Electronics(String name,double price,String brand )
    {
        super(name,price);
        this.brand=brand;
    }
    public  void displayInfo()
    {
        super.displayInfo();
        //super.calculateTotalCost();
        System.out.println("Product Brand is :"+brand);
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
        System.out.println("Product size is :"+size);
    }
}

public class Main
{
    public static void OnlineShoppingSystemTester(String[] args)
    {
        Electronics e=new Electronics("MSI",65000,"thin gsi");
        e.displayInfo();
        System.out.println("the total cost is :"+e.calculateTotalCost(5));
        Clothing c=new Clothing("shirt",500,"m");
        c.displayInfo();
        System.out.println("the total cost is :"+c.calculateTotalCost(5));
    
    }
}