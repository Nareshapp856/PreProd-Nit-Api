 public class Product 
{
	
	String productName;
	int stockQuantity;
	double price;
	public void displayDetails()
	{
	System.out.println("productId"+productID);
		System.out.println("productName"+productName);
		System.out.println("stockQuantity"+stockQuantity);
	}
	public int updatePrice(double newPrice)
	{
		stockQuantity=stockQuantity+quantity;
		return quantity;
	}
	public int checkAvailable(int stockQuantity)
	{
		if(stockQuantity>0)
		{
		stockQuantity=stockQuantity- quantity;
		}
		else
		{
			System.out.println("no quantity");
		}
		return quantity;
	}
	public void calculateDiscount(double discountPercentage)
	{
		newPrice = price - (price * (discountPercentage / 100));
		
		System.out.println("productName"+productName);
		System.out.println("stockQuantity"+stockQuantity);
		System.out.println("")
	}


	public static void main(String[] args) 
	{
		Product p=new Product();
		
		p.productName="laptop";
		p.stockQuantity=57;
		System.out.println("Increases the stock by the adding specified amount:"+p.updatePrice(4));
		System.out.println("Reduces the stock by  deleting the specified amount:"+p.checkAvailable(1));
		System.out.println("price"+p.price(1000.0))
		p.displayDetails();
	}
}
