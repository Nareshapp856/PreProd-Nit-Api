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
        System.out.println("Product name : "+name);
        System.out.println("Product Price : "+price);
    }
    public double calculateTotalCost(int quantity)
    {
       double totalCost=quantity*price;
        return totalCost;
    }
}
class Electronics extends Product{
    private String brand;
    Electronics(String name,double price,String brand)
    {
        super(name,price);
        this.brand=brand;
    }
    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("Product Brand : "+brand);
    }
}
class Clothing extends Product{
    private String size;
    Clothing(String name,double price,String size)
    {
        super(name,price);
        this.size=size;
    }
    public void displayInfo()
    {
        super.displayInfo();
       System.out.println("Product Size : "+size); 
    } 
}
public class OnlineShoppingSystemTester{
    public static void main (String[] args)
    {
        Electronics e=new Electronics("laptop",60000,"hp");
        e.displayInfo();
        System.out.println("Total cost : "+e.calculateTotalCost(1)); 
        Clothing c=new Clothing("laptop",60000,"medium");
        c.displayInfo();
    }

}