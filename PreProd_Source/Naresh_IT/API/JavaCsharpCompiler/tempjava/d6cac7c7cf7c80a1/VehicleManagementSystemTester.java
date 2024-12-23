class Vehicle()
String brand;
String model;
int year;
public  Vehicle(string brand,string model,int year)

{
    this.brand=brand;
    this.model=model;
    this.year=year;

  public void displayInfo()
  {
    System.out.println("the brand:"+brand);
    System.out.println("the model:"+model);
    System.out.println("the year:"+year);
  }
}
car extends Vehicle{
    int numDoors;

    public car(String brand,String model,int year,int numDoors)
    super(brand,model,year)
    this.numDoors=numdoors;
     public void Details()
     {
        System.out.println(" numDoors:"+numDoors)
     }
}
ElectricCar extends Vehicle{
    int batteryCapacity;
    public ElectricCar(String brand,Stringmodel,int year,int numDoors,int batteryCapacity)
    super(brand,model,year numDoors)
    this.batteryCapacity=batteryCapacity
    public void ElectricCar()
    {
        System.out.println(" batteryCapacity:"+batteryCapacity)
    }
}




public class VehicleManagementSystemTester
{
    public static void main(string[] args)
    
}