class Employee
{
    String name;
    int id;
    double salary;
    public  Employee(String name,int id,double salary)
    {
        this.name=name;
        this.id=id;
        this.salary=salary;
    }
    public void calculateSalary()
    {
        System.out.println("enter the name:"+name);
        System.out.println("enter the id:"+id);
        System.out.println("enter the salary:"+salary);
    }
}
class Developer extends Employee
{
    double hra;
    public Developer(String name,int id,double salary,double hra)
    {
        super(name,id,salary);
        this.hra=hra;
        }
        public void calculateSalary()
        {
            System.out.println("hra is:"+hra);
        }

}
class Manager extends Employee
{
    double ta;
    double fa;
    public Manager(String name,int id,double salary,double hra,double ta,double fa)
    {
        super(name,id,salary,hra);
        this.ta=ta;
        this.fa=fa;
         }
         public void calculateSalary()
         {
            System.out.println("the ta is:"+ta);
            System.out.println("the fa is:"+fa);
         }
}

public class EmployeeTester
{
    public void main(String[] args)
    {
        Manager m =new Manager("bhagi",12,23000,3455,3456,2313);
    }   
}
