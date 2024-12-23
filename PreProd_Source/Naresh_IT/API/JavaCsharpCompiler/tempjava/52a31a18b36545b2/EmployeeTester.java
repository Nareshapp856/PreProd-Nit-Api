class Employee
{
private String name;
private int id;
private double salary;
public Employee(String name,int id,double salary)
{
super();
this.name=name;
this.id=id;
this.salary=salary;
}
public void calculateSalary()
{
System.out.println("the employee name is:"+name);
System.out.println("the employee id is:"+id);
System.out.println("the employee salary is:"+salary);
}
class Developer extends Employee
{
private double hra;
public Developer(String name,int id,double salary,double hra)
{
super(name,id,salary);
this.hra=hra;
}
public void calculateSalary()
{
System.out.println("the house rent allowance:"+hra);
}
}
class Manager extends Employee{
    private double ta;
    private double fa;
    public Manager(String name,int id,double salary,double hra,double ta,double fa)
    {   
        super(name,id,salary,hra);
        this.ta=ta;
        this.fa=fa;
    }
    public void calculateSalary()
    {
        System.out.println("the travel allowance:"+ta);
        System.out.println("the food allowances is:"+fa);
    }
}
}
public class EmployeeTester
{
public static void main(String args[])
{
Employee e=new Employee("ramu",890,4.0000);
e.calculateSalary();
System.out.println(e);
Developer d=new Developer(5.0000);
d.calculateSalary();
System.out.println(d);
Manager m=new Manager(5.000,6.0000);
m.calculateSalary();
System.out.println(m);
}
}

