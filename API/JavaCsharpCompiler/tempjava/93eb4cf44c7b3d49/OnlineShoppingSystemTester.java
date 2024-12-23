class product
{
    protected String name;
    protected double price;
    product(String name,double price)
    {
        this.name=name;
        this.price=price;
    }
    public void displayInfo()
    {
        System.out.println("product's name:"+name);
        System.out.println("product's price:"+price);

    }
    public void calculateTotalCost(int quantity)
    {
        int Totalcost=price*qunatity;
        return Totalcost;
    }
}
    class Electronics extends Product
    {
        private String brand;
        Electronics(String name,double price,String brand)
        {
        super(name,price);
        this.brand=brand;
        }
    
    public void displayInfo()
    {
        super.displayInfo();
        System.out.println("brand:"+brand);
    }
    }
    class Clothing extends Product
    {
        private String size;
        Clothing(String name,double price,String size)
        {
            super(name,price);
            this.size=size;
        }
        public void displyInfo()
        {
            super.displayInfo();
            System.out.println("size:"+size);
        }
    }


class OnlineShoppongSystemTester
{
    public static void main(String[] args)
    {
        Electronics e=new Electronics(mobile,25000,samsung);
        Clothing c= new Clothing(shirt,600,allen;)
    }
}