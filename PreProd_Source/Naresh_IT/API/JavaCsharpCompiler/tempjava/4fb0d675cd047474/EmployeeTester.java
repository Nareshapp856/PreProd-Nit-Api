class Employee 
{
    private String name;
    private int id;
    private double salary;
    Employee(String name,int id,double salary)
    {
        super();
        this.name=name;
        this.id=id;
        this.salary=salary;
    }
    
    public double calculateSalary()
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
        salary=salry+hra;
        System.out.println("Developer salary :"+salary);
    }
}
class Manager extends Employee
{
    private double ta;
    private double foodAllowance;
    Manager(String name,int id,double salary,double ta,double foodAllowance)
    {
        super(name,id,salary);
        this.ta=ta;
        this.foodAllowance=foodAllowance;
    }
   
    public void calculateSalary()
    {
        salary=salary+ta+foodAllowance;
        System.out.println("Manager salary :"+salary);
    }
}

public class EmployeeTester
{
    public static void main (String[] args)
    {
        Developer d=new Developer("siri",1000,30000,1000);
        Manager m=new Manager("Paddu",1002,50000,2000,100);
        System.out.println(d.calculateSalary());
        System.out.println(m.calculateSalary());
    }
}