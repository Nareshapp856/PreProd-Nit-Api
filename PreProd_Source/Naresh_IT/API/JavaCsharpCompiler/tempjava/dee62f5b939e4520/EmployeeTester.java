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
}
class Developer
{
    private double HRA;

    Developer(String name,int id,double salary,double HRA)
    {
        super(name,id,salary);
        this.HRA=HRA;
    }

    public void calculateSalary()
    {
        System.out.println("Salary of a Developer:"+(super.salary-HRA));
    }
}
class Manager
{
    double TA;
    double foodAllowance;

    Manager(String name,int id,double salary,double TA,double foodAllowance)
    {
        super(name,id,salary);
        this.TA=TA;
        this.foodAllowance=foodAllowance;
    }
    public void calculateSalary()
    {
        System.out.println("Salary of Manager:"+(super.salary-TA-foodAllowance));
    }
}

public class EmployeeTester
{
    public static void main(String[] args)
    {
         Developer d=new Developer("Raju",101, 
           20000,5000);
         d.calculateSalary();
         Manager m=new Manager("Ravi",102,30000, 
          2000,1500);
     m.calculateSalary();
    }
    
}