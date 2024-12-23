
/*class OnlineShoppingSystemTester
{
  protected String name;
  protected double price;

public 
{
  String name;
  double price;
}
public void calculateTotalCost()
{

}







}
*/
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