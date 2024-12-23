
class Product{

    protected String name;
    protected double price;

    Product(String n,double p){
        this.name=n;
        this.price=p;
    }
    public void displayinfo(){
        System.out.println("Name = "+name+" price = "+price);
    }
    public double calculateTotalCost(int quantity){
        return price*quantity;
    }
}
class Electronics extends Product{

    private String brand;
    Electronics(String n,double p,String b){
        super(n,p);
        this.brand=b;
    }
    public void displayinfo(){
        super.displayinfo();
        System.out.println(" Brand = "+brand);
    }
}
class Clothing extends Product{

    private String size;
    Clothing(String n,double p,String s){
        super(n,p);
        this.size=s;
    }
    public void displayinfo(){
        super.displayinfo();
        System.out.println(" Size = "+size);
    }
}





public class OnlineShoppingSystemTester{

    public static void main(String arg[]){
        Electronics e = new Electronics("watch",1200,"G-Shock");
        Clothing c = new Clothing("Shirt",1100,"Zara");
        e.displayinfo();
        c.displayinfo();
        System.out.println("Total of 2"+e.name+" = "+e.calculateTotalCost(2));
        System.out.println("Total of 3"+c.name+" = "+c.calculateTotalCost(3));
    }


}