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
        System.out.println("Vehicle brand:"+brand);
        System.out.println("Vehicle model:"+model);
        System.out.println("Vehicle manufacture year:"+year);
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
    
    public void carDetails()
    {
        super.displayInfo();
        System.out.println("Number of doors:"+numDoors);
    }
}

class ElectricCar extends Car
{
    int batteryCapacity;
    ElectricCar(String brand,String model,int year,int numDoors,int batteryCapacity)
    {
        super(brand,model,year,numDoors);
        this.batteryCapacity=batteryCapacity;
    }
    
    public void electricCarDetails()
    {
        super.carDetails();
         System.out.println("Battery capacity :"+batteryCapacity);
    }
    
}


public class VehicleManagementSystemTester
{
    Car c=new Car("TOYOKO","21c",2001,2);
    c.carDetails();
    ElectricCar e=new ElectricCar("ISUZU","54mC",2021,21);
    e.electricCarDetails();
}


