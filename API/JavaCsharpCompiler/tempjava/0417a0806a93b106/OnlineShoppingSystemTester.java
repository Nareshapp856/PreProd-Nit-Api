class Product
 {
    protected String name;
    protected Double price;

    public Product( String name, Double price)
    {
    this.name = name;
    this.price = price;
    }
    public void DisplayInfo()
    {
        System.out.println( "The name is :" +name);
        System.out.println( "And price is :" +price);
    }
    
 }
 
 class Electronics extends Product
 {
     private String brand;

    public  Electronics(String name, Double price, String brand)
    {
       super (name,price);
        this.brand = brand;
    }
    public void DisplayInfo()
    {
       super.DisplayInfo();
	   System.out.println("The brand  is :"+brand);  
    }
 }
 
 class Clothing extends Product
 {
    private String size;

    public  Clothing(String name, Double price, String size)
    {
       super (name,price);
        this.size = size;
    }
    public void DisplayInfo()
    {
       super.DisplayInfo();
	   System.out.println("The Size of cloth is :"+size);  
    }
    public double calculateTotalCost(int quantity) 
    {
        return price * quantity;
    }

 }

 public class OnlineShopping {
			public static void main (String []args)
			{

				 Electronics E = new Electronics ("fan",4999.00,"bajaj");
					E.DisplayInfo();
				
				Clothing C = new Clothing ("cloth",1999.00,"L");
				C.DisplayInfo();
	
		}

		}
   
