public class EmployeeTester
{
private String name;
private int id;
private double salary;
 EmployeeTester(String name,int id,double salary){
    this.name=name;
    this.id=id;
    this.salary=salary;
   System.out.println("salary"+salary);
}


class Developer{
private double hra;
Developer(String name,int id,double salary,double hra){
super();
this.hra=hra;
System.out.println("Salary is:"+salary);
}
}
class Manager{
    double ta;
    double foodAllowance;
    Manager(String name,int id,double salary,double ta,double foodAllowance){
        super();
    this.ta=ta;
    this.foodAllowance=foodAllowance;
    System.out.println("Salary is:"+salary);
}

}
}