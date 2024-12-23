class Employee {
    private String name;
    private int id;
    private double salary;

    // Default constructor
    public Employee() {
        this.name = "Unknown";
        this.id = 0;
        this.salary = 0.0;
    }

    // Parameterized constructor
    public Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }

    // Getter and Setter methods for name, id, and salary
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    // Method to calculate salary (basic salary in the Employee class)
    public double calculateSalary() {
        return salary;
    }
}

java
Copy code
class Developer extends Employee {
    private double hra;

    // Default constructor
    public Developer() {
        super(); // Call the Employee default constructor
        this.hra = 0.0;
    }

    // Parameterized constructor
    public Developer(String name, int id, double salary, double hra) {
        super(name, id, salary); // Call the Employee parameterized constructor
        this.hra = hra;
    }

    // Getter and Setter for hra
    public double getHra() {
        return hra;
    }

    public void setHra(double hra) {
        this.hra = hra;
    }

    // Override calculateSalary to include HRA for Developer
    @Override
    public double calculateSalary() {
        return getSalary() + hra; // Salary + HRA
    }
}

java
Copy code
class Manager extends Employee {
    private double ta; // Travel Allowance
    private double foodAllowance; // Food Allowance

    // Default constructor
    public Manager() {
        super(); // Call the Employee default constructor
        this.ta = 0.0;
        this.foodAllowance = 0.0;
    }

    // Parameterized constructor
    public Manager(String name, int id, double salary, double ta, double foodAllowance) {
        super(name, id, salary); // Call the Employee parameterized constructor
        this.ta = ta;
        this.foodAllowance = foodAllowance;
    }

    // Getter and Setter for ta and foodAllowance
    public double getTa() {
        return ta;
    }

    public void setTa(double ta) {
        this.ta = ta;
    }

    public double getFoodAllowance() {
        return foodAllowance;
    }

    public void setFoodAllowance(double foodAllowance) {
        this.foodAllowance = foodAllowance;
    }

    // Override calculateSalary to include TA and food allowance for Manager
    @Override
    public double calculateSalary() {
        return getSalary() + ta + foodAllowance; // Salary + TA + Food Allowance
    }
}

java
Copy code
public class EmployeeTester {
    public static void main(String[] args) {
        // Create a Developer object
        Developer dev = new Developer("John Doe", 101, 50000.0, 8000.0);

        // Create a Manager object
        Manager mgr = new Manager("Jane Smith", 102, 70000.0, 10000.0, 5000.0);

        // Display the calculated salary for the Developer
        System.out.println("Developer: " + dev.getName());
        System.out.println("ID: " + dev.getId());
        System.out.println("Base Salary: " + dev.getSalary());
        System.out.println("HRA: " + dev.getHra());
        System.out.println("Total Salary: " + dev.calculateSalary());
        System.out.println();

        // Display the calculated salary for the Manager
        System.out.println("Manager: " + mgr.getName());
        System.out.println("ID: " + mgr.getId());
        System.out.println("Base Salary: " + mgr.getSalary());
        System.out.println("TA: " + mgr.getTa());
        System.out.println("Food Allowance: " + mgr.getFoodAllowance());
        System.out.println("Total Salary: " + mgr.calculateSalary());
    }
}

