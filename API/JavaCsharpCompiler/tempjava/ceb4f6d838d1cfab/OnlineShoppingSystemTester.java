class product 
{
    protected String name;
    protected double price;

    public product(String name,double price)
    {
        this.name=name;
        this.price=price;
    }
    public void displayInfo()
    {
        System.out.println("Product name is :"+name);
        System.out.println("Product price is :"+price);
    }
    public int calculateTotalCost(int quantity)
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
        System.out.println("Product Brand is :"+brand);
    }
}
class Clothing extends Product
{
    private String size;
    public Clothing(String name,double price,String brand,String size)
    {
    super(name,price,brand,size)
    this.size=size; 
    }
    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("Product size is :"+size);
    }
}

public class OnlineShoppingSystemTester
{
    public static void main(String[] args)
    {
        Clothing c=new Clothing("shirt",500,"levies","m");
        c.displayInfo();
    }
}