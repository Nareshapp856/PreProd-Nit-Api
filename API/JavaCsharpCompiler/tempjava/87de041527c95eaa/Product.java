class Product 
{
	int productID;
	String productName;
	int stockQuantity;
	public int addStock(int quantity)
	{
		stockQuantity=stockQuantity+quantity;
		return quantity;
	}
	public int sellStock(int quantity)
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
	public void displayProductInfo()
	{
		System.out.println("productId"+productID);
		System.out.println("productName"+productName);
		System.out.println("stockQuantity"+stockQuantity);
	}


	public static void main(String[] args) 
	{
		ProductDetails p=new ProductDetails();
		p. productID=120;
		p.productName="laptop";
		p.stockQuantity=3;
		System.out.println("Increases the stock by the adding specified amount:"+p.addStock(4));
		System.out.println("Reduces the stock by  deleting the specified amount:"+p.sellStock(1));
		p.displayProductInfo();
	}
}
