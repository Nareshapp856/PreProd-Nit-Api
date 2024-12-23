class Employee
{
    private String name;
    private int id;
    private double salary;
    public Employee(String name,int id,double salary)
    {
        this.name=name;
        this.id=id;
        this.salary=salary;
    }
    public int calculateSalary()
    {
          return salary;
    }
}
class Developer extends Employee
{
    private double hra;
    public Developer(double hra)
    {
        super("pavan",10,10000.0);
        this.hra=hra;
    } 
    public void calculateSalary()
    { 

         salary=hra+salary; 
         System.out.println(salary);
    }
}
class Manager extends Employee
{
    private double ta;
    private double fa;
    public Manager()
    {
        super("ravi",20,200000.0);
        this.ta=ta;
        this.fa=fa;
    }
    public void calculateSalary()
    {
        salary=ta+fa+salary;
        System.out.println(salary);
    }

}
public class EmployeeTester
{
    public static void main(String args[])
    {
        Developer s1=new Developer(5000.0);
        Manager s2=new Manager(2000.0,3000.0);
        s1.calculateSalary();
        s2.calculatesalary();
    }
}