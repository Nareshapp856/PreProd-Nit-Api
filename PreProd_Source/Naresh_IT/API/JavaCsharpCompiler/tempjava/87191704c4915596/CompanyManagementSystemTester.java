class Employee {
    String name;
    int id;

    Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public void displayInfo() {
        System.out.println("Employee Name: " + this.name);
        System.out.println("Employee ID: " + this.id);
    }
}

class Manager extends Employee {
    String department;

    Manager(String name, int id, String department) {
        super(name, id); // Call the constructor of Employee
        this.department = department;
    }

    public void manageTeam() {
        System.out.println("Manager Name: " + super.name);
        System.out.println("Department: " + this.department);
    }
}

class SeniorManager extends Manager {
    int numTeams;

    SeniorManager(String name, int id, String department, int numTeams) {
        super(name, id, department); // Call the constructor of Manager
        this.numTeams = numTeams;
    }

    public void handleMultipleTeams() {
        System.out.println("Senior Manager Name: " + super.name);
        System.out.println("Department: " + this.department);
        System.out.println("Number of Teams: " + this.numTeams);
    }
}

public class CompanyManagementSystemTester {
    public static void main(String[] args) {
        // Create an Employee object
        Employee emp = new Employee("John", 101);
        emp.displayInfo();

        // Create a Manager object
        Manager mgr = new Manager("Sarah", 102, "Sales");
        mgr.displayInfo();
        mgr.manageTeam();

        // Create a Senior Manager object
        SeniorManager smgr = new SeniorManager("Alice", 103, "Engineering", 5);
        smgr.displayInfo();
        smgr.manageTeam();
        smgr.handleMultipleTeams();
    }
}
