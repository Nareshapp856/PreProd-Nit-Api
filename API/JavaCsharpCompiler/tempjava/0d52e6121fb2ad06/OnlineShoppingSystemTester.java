class Product{
	String name;
	double price;
	public Product(String name, double price) {
		super();
		this.name = name;
		this.price = price;
	}
	void displayInfo() {
		System.out.println("product's name"+name);
		System.out.println("product's Price"+price);
	}
	void calculateTotalCost(int quantity) {
		System.out.println("Total cost :"+(quantity*price));
	}
}
class  Electronics extends Product{
	private String brand;

	public Electronics(String name, double price, String brand) {
		super(name, price);
		this.brand = brand;
	}
	void displayInfo() {
		System.out.println("product's brand :"+brand);
	}
}
class Clothing extends Product{
	private String size;

	public Clothing(String name, double price, String size) {
		super(name, price);
		this.size = size;
	}
	void displayInfo() {
		System.out.println("product's size :"+size);
	}
}
public class OnlineShoppingSystemTester {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Electronics e=new Electronics("phone",60000.2,"Iphone");
		Clothing c=new Clothing("zara",1200.2,"XL");

		e.displayInfo();
		e.calculateTotalCost(2);
		c.displayInfo();
		c.calculateTotalCost(3);
	}

}