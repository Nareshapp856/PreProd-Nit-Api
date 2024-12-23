package com.it;

class vehicle
{
    String brand;
    String model;
    int year;

    public vehicle(String brand,String model,int year)
    {
        this.brand=brand;
        this.model=model;
        this.year=year;
    }

    public void displayinfo()
    {
        System.out.println("vehicle Brand is: "+brand);
         System.out.println("vehicle Model is: "+model);
        System.out.println("vehicle year is: "+year);

    }

}

class car extends vehicle
{
    int noofdoor;

    public car(String brand,String model,int year,int noofdoor)
    {
        super(brand,model,year);
        this.noofdoor=noofdoor;
    }
    public void cardetails()
    {
    	super.displayinfo();
        System.out.println("No of doors is: "+noofdoor);
        System.out.println("vehicle Brand is: "+brand);
        System.out.println("vehicle Model is: "+model);
        System.out.println("vehicle year is: "+year);


    }
}
class Electriccar extends car
{
    int batterycapacity;

    public Electriccar(String brand,String model,int year,int noofdoor,int batterycapacity)
    {
        super(brand,model,year,noofdoor);
        this.batterycapacity=batterycapacity;
    }
    
    public void electriccardet()
    {
        System.out.println("Batterycapacity is "+batterycapacity);
    super.cardetails();    

    }
}
public class VehicleManagementSystemTester
{
    public static void main(String[]args)
    {
    	Electriccar e=new Electriccar("Fortuner","Toyoto", 2020, 4,20);
    	e.electriccardet();
    	
    
    }
}