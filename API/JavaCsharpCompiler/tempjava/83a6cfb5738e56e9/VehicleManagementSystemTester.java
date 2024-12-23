class Vehicle
{
    public String brand;
    public String model;
    public int year;
    public Vehicle(String brand,String model,int year)
    {
        this.brand=brand;
        this.model=model;
        this.year=year;
    }
    public void displayinfo()
    {
        System.out.println("brand of the vehicle:"+brand);
        System.out.println("model of the vehicle:"+model);
        System.out.println("year of the vehicle:"+year);
    }
}
class car extends Vehicle
{
    public int numofdoors;
    public car(String brand,String model,int year,int numofdoors)
    {
        super(brand,model,year);
        this.numofdoors=numofdoors;  
    }
    public void cardetails()
    {
         System.out.println("doors of the vehicle:"+numofdoors);
    }
}
class electricCar extends car
{
public int batery;
 public electricCar(String brand,String model,int year,int numofdoors,int batery)
 {
    super(brand,model,year,numofdoors);
    this.batery=batery;
 }
 public void electricCardetails()
 {
    System.out.println("batery of the vehicle:"+batery);
 }
}
public class VehicleManagementSystemTester
{
    public static void main(String []args)
    {
        electricCar a=new electricCar("deo","model",2002,4,78);
        a.displayinfo();
        a.cardetails();
        a.electricCardetails();
    }
}