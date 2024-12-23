class Product {
	 protected String Productname;
	 protected double price ;
 
	public Product(String productname, double price) {
		super();
		Productname = productname;
		this.price = price;
	}
	public void displayInfo() {
		System.out.println("Productname   :"+Productname);
		System.out.println("Product-price :"+price+"rupees");
	}
	public void calculateTotalCost(int quantity) {
		double totalcost= this.price *quantity; 
		System.out.println("total-amount :"+totalcost+"rupees");
	}
}

 class Electronics extends Product{
      private String brand;

	public Electronics(String productname, double price, String brand) {
		super(productname, price);
		this.brand = brand;
	}
	public void displayInfo() {
		
	  super.displayInfo();
		System.out.println("product-Brand  :"+this.brand);
 }
 }
	class Clothing extends Product{
		
		private String size;

		public Clothing(String productname, double price, String size) {
			super(productname, price);
			this.size = size;
		}
		public void displayInfo() {
			
			  super.displayInfo();
				System.out.println("size of product   :"+this.size);
		 }
		
	}


public class Shopingsystem {

	public static void main(String[] args) {
		Electronics e1=new Electronics("smart-tv", 45000, "1+ plus");
		e1.displayInfo();
	e1.calculateTotalCost(1);
	System.out.println("--------------------------------------");
	Clothing c1 =new Clothing("shirt", 300, "polo");
	c1.displayInfo();
	c1.calculateTotalCost(2);

	
	}
}