class Employee
{
    private String name;
    private int id;
    private double salary;
    Employee(String name,int id,double salary)
    {
        this.name=name;
        this.id=id;
        this.salary=salary;
    }
    public void calculateSalary()
    {
        System.out.println("Salary:"+salary);
    }
    public double getSalary()
    {
        return salary;
    }
}
class Developer extends Employee
{
     private double hra;
     Developer(String name,int id,double salary,double hra)
     {
        super(name,id,salary);
        this.hra=hra;
     }
     public void calculateSalary()
     {
        
        System.out.println("Salary of developer:"+(super.getSalary()+hra));
     }
}
class Manager extends Employee{
    private double ta;
    private double fa;
    Manager(String name,int id,double salary,double ta,double fa)
    {
        super(name,id,salary);
        this.ta=ta;
        this.fa=fa;
    }
    public void calculateSalary()
    {
        System.out.println("Salary of Manager"+(super.getSalary()+ta+fa));
    }
}
public class EmployeeTester
{
    public static void main(String[] args)
    {
        Developer d=new Developer("Ram",101,50000,10000);
        d.calculateSalary();
        Manager m=new Manager("Vish",22,60000,20000,5000);
        m.calculateSalary();
    }
}
