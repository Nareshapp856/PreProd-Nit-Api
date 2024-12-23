public Product
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
     System.out.println("product name is:"+name);
     System.out.println("Product price is:"+price);   
}
public void calculateTotalCost(int quantity)
{
    if(quantity<0)
    {
        System.out.println("error invalid input");
    }
    else{
          name=quantity*price; 
          System.out.println("quantity is:"+quantity);
    }

    }
}
 class Electronics extends Product{

    private String brand;

    public Electronics(String name,double price,String brand)
    {
        super(name,price);
        System.out.println("product brand is:"+brand);

    }
    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("Product brand is:"+brand);
    }
 }
 class Clothing extends Electronics
 {
    private String size;

    public Clothing(String name,double price,String size)
    {
        super(name,price);
        System.out.println("product size is :"+size);
    }
    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("product size is:"+size);
    }
 }
 public class  OnlineShoppingSystemTester
{
    //System.out.println("name of the product: ");
    Clothing c = new Clothing("ponds",100.0,"small");
    Electronics e = new Electronics("fridge",24000.0,"Life good");
    c.displayInfo();

}
    
}