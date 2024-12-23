class Employee
{
    private String name;
    private int id;
    private double salary;

    public Employee(String name, int id, double salary)
    {
        this.name=name;
        this.id=id;
        this.salary=salary;
    }

    public void calculateSalary(double salary)
    {
        System.out.println("Employee name: "+name);
        System.out.println("Employee id: "+id);
        System.out.println("Employee salary: "+salary);
    }
}

class Developer extends Employee
{
    private double hra;

    public Developer(String name, int id, double salary, double hra)
    {
        super(name, id, salary);
        this.hra=hra;
    }
 public void calculateSalary(double salary)
    {
        System.out.println("Employee name: "+name);
        System.out.println("Employee id: "+id);
        System.out.println("Employee HRA: "+hra);
        salary = salary+hra;
        System.out.println("Employee salary: "+salary);
    }

}

class Manager extends Employee
{
    private double ta;
    private double foodAllowance;

    public Manager(String name, int id, double salary, double ta,double foodAllowance)
    {
         super(name, id, salary);
         this.ta=ta;
         this.foodAllowance= foodAllowance;
    }

    public void calculateSalary(double salary)
    {
        System.out.println("Employee name: "+name);
        System.out.println("Employee id: "+id);
        System.out.println("Employee Ta: "+ta);
        System.out.println("Employee foodAllowance: "+foodAllowance);
        salary = salary+ta+foodAllowance;
        System.out.println("Employee salary: "+salary);
    }  

}

public class EmployeeTester
{
    public static void main(String[] args)
    {
        Developer D = new Developer("Ganesh",123,1000,200);
        Manager M = new Manager("hari",789,2000,100,300);
        D.calculateSalary(1000);
        M.calculateSalary(2000);
    }
}