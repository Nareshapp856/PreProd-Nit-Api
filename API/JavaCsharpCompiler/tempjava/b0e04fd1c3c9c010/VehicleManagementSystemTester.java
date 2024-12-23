class Vehicle
{
   String brand;
   String model;
   int year;
   Vehicle(String brand,String model,int year)
   {
    this.brand = brand;
    this.model = model;
    this.year = year;
   } 
   public void displayInfo()
   {
    System.out.println("Vehicle brand "+brand);
    System.out.println("Vehicle model "+model);
    System.out.println("year of the vehicle  "+year);
   }
}
class Car extends Vehicle
{
    int numDoors;
    Car(String brand,String model,int year,int numDoors)
    {
        super(brand,model,year);
        this.numDoors = numDoors;
    }
    public void carDetails()
    {
    System.out.println("Vehicle brand "+brand);
    System.out.println("Vehicle model "+model);
    System.out.println("year of the vehicle  "+year);
    System.out.println("number of doors "+numDoors);  
    }
}
calss ElectricCar extends Car{
    int batteryCapacity;
    ElectricCar(String brand,String model,int year,int numDoors,int batteryCapacity)
    {
        super(brand,model,year,numDoors);
        this.batteryCapacity = batteryCapacity;
    }
    public void electricCarDetails()
    {
    System.out.println("Vehicle brand "+brand);
    System.out.println("Vehicle model "+model);
    System.out.println("year of the vehicle  "+year);
    System.out.println("number of doors "+numDoors); 
    System.out.println("battery capacity"+batteryCapacity);
    }
}
public class VehicleManagementSystemTester 
{
public static void main(String[] args)
{
ElectricCar e = new ElectricCar("BMW","model11",2001,4,4);
e.displayInfo();
e.carDetails();
e.electricCarDetails();
}
}