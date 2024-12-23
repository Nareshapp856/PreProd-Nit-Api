public class Product{
    String productName;
    double price;
    int quantity;

    public void displayDetails(){
        System.out.println("Product Name: "+productName);
        System.out.println("Price: "+price);
        System.out.println("Quantity: "+quantity);
    }

    public void updatePrice(double newPrice){
        int update = newPrice;
        System.out.println(update);

    }

    public void checkAvailable(int stockQuantity){
        if(stockQuantity>0){
            System.out.println("Is the product available in stock? true");
        }else{
            System.out.println("Is the product available in stock? false");
        }

    }

    public void calculateDiscount(double discountPercentage){
        newPrice = price - (price * (discountPercentage / 100));
        System.out.println("Discounted Price after 10% off:"+newPrice);

    }

    public static void main(String[] args){
        Product P1 = new Product();
        P1.displayDetails();
        P1.updatePrice(1200.0);
        P1.checkAvailable(57);
        P1.calculateDiscount(1000.0);

    }
}