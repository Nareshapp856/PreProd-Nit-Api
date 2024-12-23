

class Vehicle
{
	String make;
	String model;
	int year;
	public Vehicle(String make,String model,int year)
	{
		
		this.make=make;
		this.model=model;
		this.year=year;
	}
	public void displayDetails()
	{
		System.out.println("make: "+make);
		System.out.println("model: "+model);
		System.out.println("year :"+year);
	}
}
class Car extends Vehicle
{
	int noofdoors;  //4
	public Car(String make, String model, int year, int noOfDoors)
	{
		
		super(make,model,year);
		if(year<=0)
		{
			System.err.println("Error Invalid Input");
		}
		noofdoors = noOfDoors;
	}
	 public void displayDetails()
	 {
		 super.displayDetails();
		 System.out.println("Number Of Doors "+noofdoors);
	 }
}

class Bike extends Vehicle
{
	String type;
	public Bike(String make,String model,int year, String type)
	{
		super(make,model,year);
		this.type=type;
	}
	public void displayDetails()
	{
		super.displayDetails();
		System.out.println("Bike type:"+type);
	}
}
public class VehicleManagementSystemTester
{
	public static void main(String[] args)
	{
		Car c = new Car("Audi","Q8",2021,6);
		System.out.println("car details:");
		c.displayDetails();
		System.out.println("==============================");
		Bike b =new Bike("Yamaha","MT-07",2020,"Sports");
		System.out.println("Bike Details :");
	    b.displayDetails();
	}
}