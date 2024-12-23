Class Product{
    protected String name;
    protected double price;
    Product(String name,double price){
            this.name=name;
            this.price=price;
    }
    public void displayInfo(){
        System.out.println(this.name);
        System.out.println(this.price);
    }
    public int calculateTotalCost(int quantity){
        int totalcost=quantity*this.price;
        return totalcost;
    }

}
Class Electronics extends Product{
    private String brand;
    Electronics(String name,double price,String brand){
            super(name,price);
            this.brand=brand;

    }
    public void displayInfo(){
        System.out.println(this.brand);
    }
}
Class Clothing extends Product{
    private String size;
    Clothing(String name,double price,String size){
        super(name,price);
        this.size=size;
    }
    public void displayInfo(){
        System.out.println(this.size);
    }

} 
public Class OnlineShoppingSystemTester(){
    public static void main(String[] args){
        Electronics e = new Electronics(fan,1200,usha);
        Clothing c= new Clothing(tshirt,200,32);
        e.displayInfo();
        c.displayInfo();
        System.out.println(e.calculateTotalCost(4));
         System.out.println(c.calculateTotalCost(4));



    }
}