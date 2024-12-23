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
        System.out.println("product name:"+name);
        System.out.println("product price"+price);
    }
    
}
class Electronics extends Product
{
    private String brand;
    puclic Electronics(String name,doble price,String brand)
    {
        super(name,price);
        this.barnd=brand;
    }
   public void  displayInfo()
   {
    System.out.println("product brand: "+brand);
   } 
    
}
class  Clothing extends Product
{
    String size;
    public Clothing(String name,double price,String brand,String size)
    {
        super(name,price,brand);
        this.size=size;
        
    }
public void displayInfo()
{
System.out.println("product size: "+size);
}
}
public class OnlineShoppingSystemTester
{
    public static void main(String args[])
    {
 Prodct p=new Product("venky",4000);
 p.displayInfo();
 Clothing c=new Clothing("venky",600,"s size");
p.displayInfo();
c.displayInfo();
 Electronics e=new Electronics("laxmi",400,"vivo");
 p.displayInfo();
 e.displayInfo();

    }
}