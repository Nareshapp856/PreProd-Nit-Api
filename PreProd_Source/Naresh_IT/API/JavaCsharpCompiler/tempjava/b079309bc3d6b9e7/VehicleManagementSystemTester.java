class Vehicle
{
    String brand;
    String model;
    int year;
    Vehicle(String brand,String model,int year)
    {
        this.brand=brand;
        this.model=model;
        this.year=year;
    }
    public void displayDetails()
    {
        System.out.println("brand :"+brand);
        System.out.println("model :"+model);
        System.out.println("year :"+year);
    }
}

class Car extends Vehicle
{
    int numDoors;
    Car(String brand,String model,int year,int numDoors)
    {
        super(brand,model,year);
        this.numDoors=numDoors;
    }
    public void displayDetails()
    {
        super.displayDetails();
        System.out.println("numDoors :"+numDoors);
    }
}
class ElectricCar extends Car
{
    int batteryCapacity;
    ElectricCar(String brand,String model, int year,int  numDoors, int batteryCapacity)
    {
        super(brand, model, year, numDoors);
        this.batteryCapacity=batteryCapacity;
    }
    public void displayDetails()
    {
        super.displayDetails();
        System.out.println("batteryCapacity :"+batteryCapacity);
    }
} 
public class VehicleManagementSystemTester
{
    ElectricCar e=new ElectricCar("spider","hero",20,4,3);
   e.displayDetails();
}