class product{
    String name;
    double price;
    public product(String name,double price){
        this.name=name;
        this.price=price;
        }
        public void displayInfo(){
            System.out.println("product name:"+name");
            System.out.println("product price:"+price");
        }
        public double calculateTotalCost(int quantity){
            return price*quantity;
        }
    }
    class Electronics extends product{
        String brand;
        public Electronics(String name,double price,String brand){
            this.brand=brand;
        }
        public void displayInfo(){
            System.out.println("Brand:"+brand);
        }
    }
    class Clothing extends product{
        String size;
        public Clothing(String name,double price,String brand,String size){
            this.size=size;
    }
    public void displayInfo(){
        System.out.println("Size:"+size);
    }
}
public class OnlineShoppingSystemTester{
    public static void main(String args[]){
        Electronics e=new Electronics("laptop",50000,"dell");
        e.displayInfo;
        System.out.println("TotalCost:"+e.calculateTotalCost(2));
        clothing c=new clothing("kutrhi",500,"xl");
        c.displayInfo;
        System.out.println("TotalCost:"+c.calculateTotalCost(2));
    }
}