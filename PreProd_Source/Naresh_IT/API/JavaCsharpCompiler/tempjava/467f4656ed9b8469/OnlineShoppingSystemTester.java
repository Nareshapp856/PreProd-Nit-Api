package assignment;

class Product
{
    protected String name;
    protected double price;
    public Product(String name,double price)
    {
        this.name=name;
        this.price=price;

    }
    public void displayInfo()
    {
        System.out.println(name+" "+price);
    }
    public double calculateTotalCost(int quantity)
    {
    	double quant=quantity;
        return price*quant;
    } 
}
class Electronics extends Product
{
    private String brand;
    public Electronics(String name,double price,String brand)
    {
        super(name,price);
        this.brand=brand;
    }
    public void displayinfo()
    {
        System.out.println("brand is "+brand);
    }
}
class Clothing extends Product{
    private String size;
    public Clothing(String name,double price,String brand,String size){
        super(name,price);
        this.size=size;
    }
    public void displayInfo()
    {
    	super.displayInfo();
        System.out.println("size is "+size);
    }
    
}


class OnlineShoppingSystemTester {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Electronics ele=new Electronics("powerbank",1200,"mi");
		ele.displayInfo();
		ele.calculateTotalCost(10);
		Clothing clo=new Clothing("Jeans shirt",1500,"sparky","L");
		clo.displayInfo();

	}

}
