class Employee {
    private String name;
    private int id;
    private double salary;

    public Employee() {
        this.name = "Unknown";
        (link unavailable) = 0;
        this.salary = 0.0;
    }

    public Employee(String name, int id, double salary) {
        this.name = name;
        (link unavailable) = id;
        this.salary = salary;
    }

    public double calculateSalary() {
        return salary;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }
}

class Developer extends Employee {
    private double hra;

    public Developer() {
        super();
        this.hra = 0.0;
    }

    public Developer(String name, int id, double salary, double hra) {
        super(name, id, salary);
        this.hra = hra;
    }

    @Override
    public double calculateSalary() {
        return super.calculateSalary() + hra;
    }

    public double getHra() {
        return hra;
    }
}

class Manager extends Employee {
    private double ta;
    private double foodAllowance;

    public Manager() {
        super();
        this.ta = 0.0;
        this.foodAllowance = 0.0;
    }

    public Manager(String name, int id, double salary, double ta, double foodAllowance) {
        super(name, id, salary);
        this.ta = ta;
        this.foodAllowance = foodAllowance;
    }

    @Override
    public double calculateSalary() {
        return super.calculateSalary() + ta + foodAllowance;
    }

    public double getTa() {
        return ta;
    }

    public double getFoodAllowance() {
        return foodAllowance;
    }
}

public class EmployeeTester {
    public static void main(String[] args) {
        Developer developer = new Developer("John Doe", 101, 50000.0, 10000.0);
        Manager manager = new Manager("Jane Smith", 201, 100000.0, 20000.0, 5000.0);

        System.out.println("Developer Details:");
        System.out.println("Name: " + developer.getName());
        System.out.println("ID: " + developer.getId());
        System.out.println("Salary: " + developer.calculateSalary());
        System.out.println("HRA: " + developer.getHra());

        System.out.println("\nManager Details:");
        System.out.println("Name: " + manager.getName());
        System.out.println("ID: " + manager.getId());
        System.out.println("Salary: " + manager.calculateSalary());
        System.out.println("TA: " + manager.getTa());
        System.out.println("Food Allowance: " + manager.getFoodAllowance());
    }
}