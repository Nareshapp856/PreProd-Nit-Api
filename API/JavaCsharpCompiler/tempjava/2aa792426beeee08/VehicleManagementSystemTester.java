package OOPs;

class Vehicle11
{
    String brand;
    String model;
    int year;

    Vehicle11(String brand, String model, int year)
    {
        super();
        this.brand=brand;
        this.model=model;
        this.year=year;
    }
    public void displayInfo()
    {
        System.out.println("Brand of the vehicle :"+brand);
        System.out.println("Model of the vehicle :"+model);
        System.out.println("Year of the vehicle :"+year);
    }
}
class Car extends Vehicle11
{
    int numDoors;

    Car(String brand, String model, int year, int numDoors)
    {
        super(brand,model,year);
        this.numDoors=numDoors;
    }
    public void carDetails()
    {
        System.out.println("Number of Doors of vehicle :"+numDoors);
    }
}
class ElectricCar extends Car
{
    int batteryCapacity;

    ElectricCar(String brand, String model, int year, int numDoors,int batteryCapacity)
    {
    
        super(brand,model,year,numDoors);
        this.batteryCapacity=batteryCapacity;
    }
    public void electricCarDetails()
    {
        super.displayInfo();
        System.out.println("Battery Capacity :"+batteryCapacity+"kWh");
    }
}

public class vehicleManagementSystemTester {

	public static void main (String [] args)
    {
        ElectricCar EC = new ElectricCar("Maruti","Swift",2020,4,1500);
        
        EC.carDetails();
        EC.electricCarDetails();
    }
}
