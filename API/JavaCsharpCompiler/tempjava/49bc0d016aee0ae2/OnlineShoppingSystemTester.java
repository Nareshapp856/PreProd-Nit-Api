  class product{
    String name;
    double prize;
    public displayinfo(String name,double prize){
    this.name=name;
    this.prize=prize;
}
  }
 public void calculateTotalcost(double quantity){
    totalcost=product+quantity;
 }
   class Electronic  Extends product(){
    String brand;
    public displayinfo(String name,double prize,String size){
    super(String name,Double prize);
    this.brand=brand;
 }
   }
 public class OnlineShoppingSystemTester{
    public static void main(String()args){
        product p=new product();
        p.displayinfo("watch",1000);

    }

 }

    
 



