public class EmployeeTester
{
private String name;
private int id;
private double salary;
 EmployeeTester(String name,int id,double salary){
    this.name=name;
    this.id=id;
    this.salary=salary;
   
}


class Developer{
private double hra;
calculateSalary Employee(String name,int id,double salary,double hra){
super();
this.hra=hra;
double salary=salary+hra;
System.out.println("Salary is:"+salary);
}
}
class Manager{
    double ta;
    double foodAllowance;
    calculateSalary Manager(String name,int id,double salary,double ta,double foodAllowance){
        super();
    this.ta=ta;
    this.foodAllowance=foodAllowance;
    double salary=salary+ta+foodAllowance;
    System.out.println("Salary is:"+salary);
}

}
}