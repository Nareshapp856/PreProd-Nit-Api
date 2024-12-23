
 class Product
{
	String name;
	double price;
	
	public Product(String name,double price)
	{
		this.name=name;
		this.price=price;
	}
	
	public void dispalyInfo()	
	{
		System.out.println("Product Name is :"+name);
		System.out.println("Priduct Price is "+price);
	}
	public double calculateTotalCost(int quantity)
	{
		return price*quantity;
		
	}
}

class Electronics extends Product
{
	private String brand;
	
	public  Electronics(String name,double price,String brand)
	{
		super(name,price);
		this.brand=brand;
		
	}
	public void displayInfo()
	{
		System.out.println("Priduct Brand is :"+brand);
		super.dispalyInfo();
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
		System.out.println("Product Size is :"+size);
		super.dispalyInfo();
		
	}
}
public class OnlineShoppingSystemTester
{
    public static void main(String [] args)
    {
        Electronics swap=new Electronics("shasx",30000,"gxsh");
        swap.dispalyInfo();
    }
}

