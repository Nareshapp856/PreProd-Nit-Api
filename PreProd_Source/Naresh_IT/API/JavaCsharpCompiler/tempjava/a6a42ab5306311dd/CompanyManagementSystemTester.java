package TestWork;

class Employee {
    String name;
    int id;


    public Employee (String name,int id)
    {
        this.name = name;
        this.id = id;
    }

    public void displayInfo()
    {
        System.out.println("Employee Name:" + name );
        System.out.println("Employee ID:" + id);
    }
}

class Manager extends Employee
{
   String department ;


   public Manager(String name, int id, String department)
   {
    super(name,id);
    this.department = department;
   }

   public void manageTeam()
   {
    System.out.println("Managers Name:" + name);
    System.out.println("Department Name:" + department);
   }
}
class SeniorManager extends Manager
{
   int numTeams ;


   public SeniorManager(String name, int id, String department,int numTeams)
   {
    super(name,id,department);
    this.numTeams = numTeams;
   }

   public void handleMultipleTeams()
   {
    
    System.out.println("Number of teams managed by the senior manager.:" + numTeams);
   }
}

public class CompanyManagementSystemTester
 {

   public static void main(String[] args) {
    
    SeniorManager kunu = new SeniorManager("Biswajit Rout", 111, "IT", 3);

    System.out.println("The Details of Employee :");
    kunu.displayInfo();

    System.out.println("The Details of Manager :");
    kunu.manageTeam();

    System.out.println("The Details of Senior Manager :");
     kunu.handleMultipleTeams();
   }

}
