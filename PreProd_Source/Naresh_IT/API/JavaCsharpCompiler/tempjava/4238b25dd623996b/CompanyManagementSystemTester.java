
class Employee
{
     String name;
     int id;

    public  Employee(String name,int id){
        this.name=name;
        this.id=id;
    }

    public void  displayInfo(){
        System.out.println("employee name= "+name);
        System.out.println("employee id= "+id);  
    }
}
class Manager extends Employee
{
    String department;

    public  Manager(String name,int id,String department){
        super(name,id);
        this.department=department;
    }
    public void manageTeam(){
        super.displayInfo();
        System.out.println("manager name is= "+name);
        System.out.println("department is= "+department);

    }
}
class SeniorManager extends Manager
{
    int teams;

    public  SeniorManager(String name,int id,String department,int teams){
        super(name,id,department);
        this.teams=teams;
    }
    public void  handleMultipleTeams(){
        super.manageTeam();
        System.out.println("number of teams = "+teams);
    }
}
public class CompanyManagementSystemTester
{
    public static void main(String[] args){
        Manager M=new Manager("rocky"491,"developer");
        M.manageTeam();
        
    }
}