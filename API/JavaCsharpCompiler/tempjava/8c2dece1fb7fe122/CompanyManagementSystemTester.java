
class Employee
{
    String name;
    int id;
    Employee(String name,int id)
    {
        this.name=name;
        this.id=id;
    }
    public void display()
    {
        System.out.println("name is"+name);
        System.out.println("id is"+id);
    }
}
class Manager extends Employee
{
     String dept;
     Manager(String name,int id,String dept)
     {
        super(name,id);
        this.dept=dept;

     }
     public void manageteam()
     {
        System.out.println("name is"+name);
        System.out.println("dept is"+dept);
     }

}
class Senior extends Manager
{
    int teams;
    Senior(String name,int id,String dept,int teams)
    {
    super(name,id,dept);
    this.teams=teams;
    }
    public void handleteams()
    {
        System.out.println("no of teams "+teams);
    }
}
public class CompanyManagementSystemTester
{
    public static void main(String[] args)
    {
        Senior obj = new Senior("ganesh",1,"marketing",5);
        obj.display();
        obj.manageteam();
        obj.handleteams();
    }
}