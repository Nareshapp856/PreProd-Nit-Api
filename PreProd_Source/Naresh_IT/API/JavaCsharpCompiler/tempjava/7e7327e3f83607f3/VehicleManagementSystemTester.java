
class Vehicle 
{
	private String brand;
	private String model;
	private int year;
	
	public Vehicle(String brand, String model, int year)
	{
		this.brand = brand;
		this.model = model;
		this.yera = year;
	}
	
	public String brand()
	{
		return brand;
	}
	
	public String model()
	{
		return model;
	}
	
	public int year()
	{
		return year;
	}

// 	@Override
// 	public String toString() {
// 		if(getRentalPrice() == -1)
// 		{
// 			return "Invalid Input Rental Price";
// 		}else {
// 			return "Vehicle [Type : " + getVehicleType() + ", License Plate : " + getLicensePlate()
// 				+ ", Rental Price : $" + getRentalPrice() + "]";
// 		}
// 	}	
// }

class Car extends Vehicle 
{
	private int numdoor;
	
	public Car(String brand, String model, int year, int numdoor)
	{
		super(brand,model,year);
		this.numdoor=numdoor;
	}
	
	public String  numdoor()
	{
		return  numdoor;
	}

// 	@Override
	
// 	public String toString() {
// 		if(getRentalPrice() == -1)
// 		{
// 			return "Invalid Input Rental Price";
// 		}else {
// 			return "Car [Type : " + getVehicleType() + ", License Plate : " + getLicensePlate() + ", Rental Price : $" + getRentalPrice() + 
// 				", Fuel Type : " + getFuelType() + "]";
// 		}
// 	}
// }

class electricCar extends Vehicle 
{
	private int battrycapicity;
	
	public electricCar(String brand, String model, int year, int numdoor,int battrycapicity)
	{
		super(brand,model,year,numdoor);
		this.battrycapicity=battrycapicity;
	}
	
	public String  battrycapicity()
	{
		return  battrycapicity;
	}
	
	
	// @Override
	// public String toString() {
	// 	if(getRentalPrice() == -1)
	// 	{
	// 		return "Invalid Input Rental Price";
	// 	}else {
	// 		return "Bike [Type : " + getVehicleType() + ", License Plate : " + getLicensePlate() + ", Rental Price : $" + getRentalPrice() + 
	// 			", Has Gear : " + getHasGear() + "]";
	// 	}
	}
}


public class VehicleManagementSystemTester
{
	public static void main(String[] args) 
	{
		Car c1 = new Car("nxon", "honda", 2001, 5);  
		electricCar e1 = new electricCar("ev", "tava", 2001,4,3.0);  
		
		System.out.println(c1);
		System.out.println();
		System.out.println(e1);
	}

}