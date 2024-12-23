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
    public void displayInfo()
    {
        System.out.println("Brand:"+brand);
        System.out.println("Model:"+model);
        System.out.println("Year:"+year);
    }
}
class Car extends Vehicle{
    int numDoors;
    Car(String brand,String model,int year,int numDoors)
    {
        super(brand,model,year);
        this.numDoors=numDoors;
    }
    public void carDetails()
    {
        super.displayInfo();
        System.out.println("Number of Doors:"+numDoors);
    }
}
class ElectricCar extends Car{
    int batteryCapacity;
    ElectricCar(String brand,String model,int year,int numDoors,int batteryCapacity)
    {
        super(brand,model,year,numDoors);
        this.batteryCapacity=batteryCapacity;
    }
    public void electricCarDetails()
    {
        super.carDetails();
        System.out.println("Battery Capacity:"+batteryCapacity);
    }
}
public class VehicleManagementSystemTester 
{
    public static void main(String[] args)
    {
         ElectricCar e=new ElectricCar("Ford","A",2002,6,900);
         e.electricCarDetails();
    }
}