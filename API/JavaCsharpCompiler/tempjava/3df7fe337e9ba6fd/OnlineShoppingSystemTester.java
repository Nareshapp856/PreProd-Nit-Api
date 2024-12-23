class Product1
{
    protected String name;
    protected double price;

    public Product1(String name,double price)
    {
       this.name=name;
       this.price=price;
    }
    public void displayInfo()
    {
        System.out.println("name:"+name);
        System.out.println("price:"+price);
    }
    
    public double totalCost(int quantity)
    {
       double quantity1=quantity*price;
        return quantity1;
    }
}

class Electronic extends Product1
{
    private String brand;

  public Electronic(String name, double price, String brand) {
		super(name, price);
		this.brand = brand;
	}


public void voidisplayInfo()
   {
    System.out.println("Product brand is :"+brand);
   }
}

class Clothing extends Product
{
    private String size;

    
	public Clothing(String name, double price, String brand,String size) {
		super(name, price);
		this.size = size;
	}


	public void displayInfo()
    {
        System.out.println("Product size is :"+size);
    }
}

public class OnlineShoppingSystemTester
{
	public static void main(String[]args)
	{
    Clothing c=new Clothing("shirt",700,"denim","");
    c.calculateTotalCost(5);
    System.out.println(c);

}
}
  

