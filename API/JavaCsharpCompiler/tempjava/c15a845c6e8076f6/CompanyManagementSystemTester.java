
class Employee
{
    String name;
     int id;

    public Employee(String name, int id)
    {
        super();
        this.name = name;
        this.id = id;
    }
    public void  displayInfo()
    {
        System.out.println("Name :"+this.name);
        System.out.println("Id :"+this.id);
    }
     
}

class Manager extends Employee
{
    private String department;
    public Manager(String name, int id, String department)
    {
        super(name,id);
        this.department = department;
    }
    void manageTeam()
    {
         System.out.println("Name :"+super.name);
         System.out.println("Department :"+this.department);
    }
}

class SeniorManager extends Manager
{
    int numTeams;
    public SeniorManager(String name, int id,String department, int numTeams)
    {
        super(name,price,department);
        this.numTeams = numTeams;
    }
    void handleMultipleTeams()
    {
         System.out.println(" Number of teams :"+this.numTeams);
    }
}

public class CompanyManagementSystemTester

{
    public static void main(String [] args)
    {
         SeniorManager seniorManager = new SeniorManager("John",1002,"HR Department",3); 

         seniorManager.displayInfo();
         seniorManager.manageTeam();
         seniorManager.handleMultipleTeams();

    }
}