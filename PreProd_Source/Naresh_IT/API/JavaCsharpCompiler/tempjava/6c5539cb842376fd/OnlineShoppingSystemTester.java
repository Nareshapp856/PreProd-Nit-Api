class product{

    String name;
    double price;

    public product( String name,double price);
    {

        this.name=name;
        this.price=price;
    }
    public void displayInfo() {

        System.out.println("product name"+name);

        System.out.println("product price"+price);
    }
    public void  calculateTotalCost(int quantity) {


                 double=price*(intquantity);


    }
    class Electronics extends product{

        String brand;

        public Electronics(String name,double price,String brand);
        {

            super(name,price);
            this.size=brand;
        }
        public void displayInfo(){
                    
         System.out.println("product brand"+brand);


        }  

        class clothing extends product{

            String size;

            public clothing(String name,double price,String brand,String size);
            {

            super(name,price,brand);
            this.size=size;

        }  

        public void displayInfo() {

         System.out.println("product size"+size);




        }

    public class OnlineShoppingSystemTester{

        public static void main(String[] args)
        {
            Electronics e1=new Electronics("raju",1000,"mexicon");

            e1.displayInfo();

        System.out.println("====================");

        clothing c1=new clothing(5);
         
         c1.displayInfo();





        }
    } 
        }



    }

    }

    }

}