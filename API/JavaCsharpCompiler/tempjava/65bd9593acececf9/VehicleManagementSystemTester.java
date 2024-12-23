class Vehicle
{
  String brand;  
  String model;
  int year;

  public void Vehicle(String brand,String model, int year)
  {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }
void displayInfo()
    {
        System.out.println("brand: "+this.brand);
        System.out.println("model: "+this.model);
        System.out.println("year: "+this.year);
    }
}
class Car extends Vehicle
{
    int numDoors;

     public void Car(String brand,String model, int year,int numDoors)
     {
        super.(brand,model,year);
       this.numDoors = numDoors;
     }

     void carDitails()
        {
            super.displayInfo();
            System.out.println("year: "+this.year);
        }
}

class ElectricCar extends Vehicle
{
    int batteryCapacity;
    public void ElectricCar(String brand,String model, int year,int batteryCapacity)
     {
        super.(brand,model,year);
        this.batteryCapacity =batteryCapacity;
     }

     void ElectricCarDetails()
     {
        super.displayInfo();
        System.out.println("battery batteryCapacity is: "+this.batteryCapacity+"km");
     }
}

public class VehicleDemo
{
 public static void main(String[] args)
    {
    Car car = new Car("bmw","bt 550",2024,4);
    car.carDitails();
    System.out.println("====electric car details======");
    ElectricCar ecar = new ("tesla","mmt 550",2024,500);
    ecar.ElectricCarDetails();
    }
}