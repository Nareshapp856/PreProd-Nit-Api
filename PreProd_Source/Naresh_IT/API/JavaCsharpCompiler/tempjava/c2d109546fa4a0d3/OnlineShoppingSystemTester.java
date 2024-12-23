public class Product 
{
	String name;
	double price;
	public Product(String name, double price) {
		super();
		this.name = name;
		this.price = price;
	}
	public void displayInfo() 
	{
		System.out.println("Product name is:"+name);
		System.out.println("Product price is:"+price);
	}
	public double calculateTotalCost(int quantity)
	{
		return price*quantity;
	}
}
class Electronics extends Product
{
	String brand;

	public Electronics(String name, double price, String brand) {
		super(name, price);
		this.brand = brand;
	}
	public void displayInfo()
	{
		super.displayInfo();
		System.out.println("Product's brand is:"+brand);
	}
}
class Clothing extends Product
{
	private String size;

	public Clothing(String name, double price, String size) {
		super(name, price);
		this.size = size;
	}
	public void displayInfo()
	{
		super.displayInfo();
		System.out.println("product's size is:"+size);
	}
}

public class OnlineShoppingSystemTester
{
	public static void main(String[] args) 
	{
		Electronics e1 = new Electronics("Laptop",40000,"Lenovo");
	    e1.displayInfo();
	    System.out.println("Total cost: "+e1. calculateTotalCost(4));
	    
	    System.out.println("============================");
	    
	    Clothing c1 = new Clothing("kurti",400,"m");
	    c1.displayInfo();
	    System.out.println("Total cost: "+c1. calculateTotalCost(4));
	}

}
