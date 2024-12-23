class Product
{
    String prodName;
    double prodPrice;

    Product(String prodName, double prodPrice)
    {
        this.prodName=prodName;
        this.prodPrice=prodPrice;
    }

    public void displayInfo()
    {
        System.out.println("Product Name = "+prodName);
        System.out.println("Product Price = "+prodPrice);

    }
    
    public double calculateTotalCost(int quantity)
    {
    	
    	return prodPrice*quantity;
    	
    }
    
  
    


}

class Electronics extends Product
{
   private String brand;

    public Electronics(String name, double price, String brand)
    {
        super(name,price);
        this.brand=brand;

    }
    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("Product brand = "+brand);

    }

}

class Clothing extends Product
{
    String size;

    public Clothing( String name, double price, String size)
    {
        super(name,price);
        this.size=size;

    }
     public void displayInfo()
     {
       super.displayInfo();
        System.out.println("Size of cloth is: "+size);
     }

}

public class OnlineShoppingSystemTester
{
    public static void main(String []args)
    {
     Electronics e = new Electronics("laptop",50000,"Dell");
     Clothing c = new Clothing("Maxfashion",2000,"Max2");
     e.displayInfo();
     
     c.displayInfo();
     e.calculateTotalCost(2);
     c.calculateTotalCost(5);
     
     System.out.println(e.calculateTotalCost(2));
     System.out.println(c.calculateTotalCost(2));
     
    }
}

	