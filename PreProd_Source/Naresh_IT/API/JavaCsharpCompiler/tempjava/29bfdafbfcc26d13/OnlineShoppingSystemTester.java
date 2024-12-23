
package Inheritance;

class product {
	
		protected String name;
		protected double price;
		public product(String name, double price) {
			super();
			this.name = name;
			this.price = price;
		}
		public void displayInfo() {
			System.out.println("Product name:"+name);
			System.out.println("Product Price:"+price);
		}
		public double calculateTotalCost(int quantity) {
	return quantity*price;
		}
	}
	class Electronic extends product{
		private String brand;

		public Electronic(String name, double price, String brand) {
			super(name, price);
			this.brand = brand;
		}
		public void displayInfo() {
			System.out.println("Product Name:"+name);
			System.out.println("product Price:"+price);
			System.out.println("Product Brand:"+brand);
		}
		
	}
	class clothing extends product{
		private String size;

		public clothing(String name, double price, String size) {
			super(name, price);
			this.size = size;
		}
		public void displayInfo() {
			System.out.println("Product Name:"+name);
			System.out.println("product Price:"+price);
			System.out.println("Product Size:"+size);
		}
		
		
	}

public class OnlineShoppingSystemTester 
{
	
		public static void main(String[] args) {
			product p1 = new product("TV",65000);
	p1.displayInfo();
	System.out.println("TotalPrice:"+p1.calculateTotalCost(3));
	System.out.println("====================================");
	Electronic p2 = new Electronic("Laptop",50000,"HP");
	p2.displayInfo();
	System.out.println("Total Price:"+p2.calculateTotalCost(2));
	System.out.println("====================================");
			clothing p3=new clothing("Hudi",800,"XL");
			p3.displayInfo();
	System.out.println("Total Price:"+p3.calculateTotalCost(5));
			System.out.print("==============================");
		}

	}