class vehicle
{
    protected String brand;
    protected  String model;
    protected int year;
    
    public vehicle(String brand,String model,int year)
    {
        super(String brand,string model,int year);
        this.brand=brand;
        this.model=model;
        this.year=year;
    }
    void displayInfo()
    {
        System.out.println("Brand name"+brand);
        System.out.println("Model name"+model);
        System.out.println("year"+year)''
    }
    class car exteds vehicle
    protected int numdoor;
    {
        public car(String brand,String model,int year)
        {
            super(String brand,string model,int year,numdoor)
           this.brand=brand;
           this.model=model;
           this.year=year;
            this.numdoor =numdoor;

                void carDetails()
                {
                    int numdoor=5;
                    system.out.println("number of door"+numdoor);
                }

        }
    }
    class electriccar exteds car
    {
        protected int batteryCapicity;
        {
            public electriccar(String brand,string modle ,int year int, batteryCapicity)
            super(string brand,string model,int year,int numdoor,int batteryCapicity)
            this.brand=brand;
            this.model=model;
            this.year=year;
            this.numdoor=numdoor;
            this.batteryCapicity=batteryCapicity;
            

        }
        void carDetails()
        {
            System.out.println("battry batteryCapicity "+batteryCapicity);
            system.out.println("car car Details"+displayInfo);
        }

    }
}
public static void main(String[]args)
{
 system.out.println("nexon","maruti",2001,4,200000);
 d1.displayInfo();
}

