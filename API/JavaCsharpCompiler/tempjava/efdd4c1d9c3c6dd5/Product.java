public class Product{
String productName;
double price;
int quantity;
    public void displayDetails(){
        System.out.print("Product Name:"+productName);
        System.out.print(",Price:"+price);
        System.out.print(",Quantity:"+quantity);
    }
    public void  calculateDiscount(double a){
        
        price=price-(price*(a/100));
        System.out.println("\nDiscount Price arfter 10% off:"+price);
    }
    public static void main(String[]args){
        Product p1=new Product();
        p1.productName="Laptop";
        p1.price=1000.0;
        p1.quantity=57;
        p1.displayDetails();
        System.out.println("\nAfter updating the price:");
        Product p2=new Product();
        p2.productName="Laptop";
        p2.price=1200.0;
        p2.quantity=57;
        p2.displayDetails();
        double d=10;
        p2.calculateDiscount(d);


        
    }
}