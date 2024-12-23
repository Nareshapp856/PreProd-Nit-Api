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
     void displayInfo()
     {
        System.out.println("Brand :"+brand);
        System.out.println("Model :"+model);
        System.out.println("Year :"+year);
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

    void carDetails()
    {
        super.displayInfo();
        System.out.println("No. of doors :"+numDoors);
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

    void electricCarDetails()
    {
        super.carDetails();
        System.out.println("Battery Capacity :"+batteryCapacity+" kWh");
    }
}

public class VehicleManagementSystemTester
{
    public static void main(String [] args)
    {
        ElectricCar ev1= new ElectricCar("TATA","Curvv",2024,4,18000);
        ev1.electricCarDetails();
    }
}

