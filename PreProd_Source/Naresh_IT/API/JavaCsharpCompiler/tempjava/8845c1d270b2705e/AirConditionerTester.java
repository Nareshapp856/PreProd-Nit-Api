class AirConditioner {
   
    private String brand;
    private boolean isOn;
    private int temperature;
    private String mode;

    
    public AirConditioner() {
        this.brand = "Generic";
        this.isOn = false;
        this.temperature = 24;
        this.mode = "Cool";
    }

    
    public AirConditioner(String brand, boolean isOn, int temperature, String mode) {
        this.brand = brand;
        this.isOn = isOn;
        this.temperature = temperature;
        this.mode = mode;
    }

    
    public void powerOn() {
        if (!isOn) {
            isOn = true;
            System.out.println("The AC is now ON.");
        } else {
            System.out.println("The AC is already ON.");
        }
    }

    
    public void powerOff() {
        if (isOn) {
            isOn = false;
            System.out.println("The AC is now OFF.");
        } else {
            System.out.println("The AC is already OFF.");
        }
    }

    
    public void setTemperature(int temp) {
        if (temp >= 16 && temp <= 30) {
            this.temperature = temp;
            System.out.println("Temperature set to " + temp);
        } else 
			{
            System.out.println("Invalid temperature Please set a value between 16 and 30");
        }
    }

    
    public void changeMode(String newMode) {
        if (newMode.equals("Cool") || newMode.equals("Heat") || newMode.equals("Fan")) {
            this.mode = newMode;
            System.out.println("Mode changed to " + newMode + ".");
        } else {
            System.out.println("Invalid mode! Please select 'Cool', 'Heat', or 'Fan'.");
        }
    }

    
    public void displayStatus() {
        System.out.println("AC Status:");
        System.out.println("Brand: " + brand);
        System.out.println("Power: " + isOn);
        System.out.println("Temperature: " + temperature);
        System.out.println("Mode: " + mode);
    }
}
import java.util.Scanner;

public class AirConditionerTester {
    public static void main(String[] args) {
       
        AirConditioner ac1 = new AirConditioner();

 
        Scanner scanner = new Scanner(System.in);

        
        System.out.print("Enter the AC brand: ");
        String brand = scanner.nextLine();

        System.out.print("Is the AC on? (true/false): ");
        boolean isOn = scanner.nextBoolean();

        System.out.print("Enter the initial temperature: ");
        int temperature = scanner.nextInt();

        System.out.print("Enter the mode (Cool/Heat/Fan): ");
        String mode = scanner.next();

        AirConditioner ac2 = new AirConditioner(brand, isOn, temperature, mode);


        System.out.println("\nOperating the default AC:");
        ac1.powerOn();
        ac1.setTemperature(18);
        ac1.changeMode("Heat");
        ac1.setTemperature(32); 
        ac1.displayStatus();

        
        System.out.println("\nOperating the user-defined AC:");
        ac2.displayStatus();
        ac2.powerOff();
        ac2.setTemperature(20);
        ac2.changeMode("Fan");
        ac2.displayStatus();

        scanner.close();
    }
}
