class Product
{
   protected String name;
   protected double price;
    public Product(String name, double price)
    {
        this.name=name;
        this.price=price;
    }
    public void displayInfo()
    {
        System.out.println("the product name is:"+name);
        System.out.println("the product price is:"+price);
    }
    public double calculateTotalCost(int quantity)
    {
        return price*quantity;
    }
}
class Electronics extends Product{
   private String brand;
   public Electronics(String name,double price,String brand)
   {
      super(name,price);
      this.brand=brand;
   }
   public void displayInfo()
   {
    super.displayInfo();
    System.out.println("the brand is:"+brand);

   }
}
class Clothing extends Product{
    private String size;
    public Clothing(String name,double price,String size)
    {
        super(name,price);
        this.size=size;
    }
    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("the size is:"+size);

    }
}
public class OnlineShoppingSystemTester
{
    public static void  main(String[]args)
    {
    Electronics e1=new Electronics("laptop",49000,"HP");
    e1.displayInfo();
    System.out.println(e1.calculateTotalCost(6));
    
    System.out.println("-------------------------");
    Clothing c1=new Clothing("suit",1400,"XL");
    c1.displayInfo();
    System.out.println(c1.calculateTotalCost(5));
    



}

}