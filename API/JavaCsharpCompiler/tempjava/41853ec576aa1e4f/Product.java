 public class Product 
{
	int productID;
	String productName;
	int stockQuantity;
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
		System.out.println("productId"+productID);
		System.out.println("productName"+productName);
		System.out.println("stockQuantity"+stockQuantity);
	}


	public static void main(String[] args) 
	{
		Product p=new Product();
		p. productID=120;
		p.productName="laptop";
		p.stockQuantity=3;
		System.out.println("Increases the stock by the adding specified amount:"+p.addStock(4));
		System.out.println("Reduces the stock by  deleting the specified amount:"+p.sellStock(1));
		p.displayDetails();
	}
}
