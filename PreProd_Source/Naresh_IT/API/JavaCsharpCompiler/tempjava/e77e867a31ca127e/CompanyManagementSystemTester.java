
class Employee
{
    String name;
    int id;

    public Employee(String name,int id)
    {
        this.name=name;
        this.id=id;
    }
    public void displayInfo()
    {
        System.out.println("Employee name = "+name);
         System.out.println("Employee id no = "+id);

    }

}
class Manager extends Employee
{
    String department;

    public Manager(String name,int id,String department)
    {
        super(name,id);
        this.department=department;
    }
    public void ManaeTeam()
    {
        super.displayInfo();
         System.out.println("Manager Derpatment is = "+department);
        
    }
}
class SeniorManager extends Manager
{
    int numTeams;

    public SeniorManager(String name,int id,String department,int numTeams)
    {
      super(name,id,department); 
      this.numTeams=numTeams; 
    }
    public void handleMultipleTeam()
    {
         System.out.println("SeniorManager handle team no = "+numTeams);
    }
}

public class CompanyManagementSystemTester
{
    public static void main(String args[])
    {
        SeniorManager s1 = new SeniorManager("Vicky",12,"Science",5);
        s1.displayInfo();
        s1.ManaeTeam();
        s1.handleMultipleTeam();
    }
}