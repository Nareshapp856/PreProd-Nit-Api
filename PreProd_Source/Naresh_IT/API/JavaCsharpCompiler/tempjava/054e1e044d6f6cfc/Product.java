public class Product{
    String productName ;
    double price ;
    int quantity ;
    public void displayDetails(){
        System.out.println("Procduct Name : " + this.productName + ", Price : " + this.price + " , Quantity : " + this.quantity);
    }
    public void updatePrice(double price){
        this.price = price ;
    }
    public void checkAvailable(int stockQuantity){
        System.out.print("Is the product available in stock? " );
        if(stockQuantity>0){
            System.out.println("true");
        }
        else{
            System.out.println("false");
        }
            // System.out.print()
    }
    public void calculateDiscount(double discountPercentage){
        int newPrice = this.price - (this.price * (discountPercentage / 100));
        this.price = newPrice ;
    }
    public static void main(String[] args){
        Product p1 = new Product();
        p1.productName = "Laptop";
        p1.price = 1000;
        p1.quantity = 57 ;
        p1.displayDetails();
        System.out.println("\nAfter updating the price : ");
        p1.updatePrice(1200);
        p1.displayDetails();
        p1.checkAvailable(p1.quantity);
        p1.calculateDiscount(10.00);
        System.out.println("Discounted Price after 10% off : " + p1.price);
    }
}