 class Employee
{
private String name;
private int id;
private double salary;
 Employee(String name,int id,double salary){
    this.name=name;
    this.id=id;
    this.salary=salary;
  
}


class Developer extends Employee {
private double hra;
Developer(String name,int id,double salary,double hra){
super(name,id,salarY);
this.hra=hra;

}
}
class Manager extends Employee{
    double ta;
    double foodAllowance;
    Manager(String name,int id,double salary,double ta,double foodAllowance){
        super(name,id,salar);
    this.ta=ta;
    this.foodAllowance=foodAllowance;
   
}
}
public class EmployeeTester{
    public static void main(String[]args){
   Developer developer=new Developer();
   developer.Developer();
Manager manager=new Manager();
   manager.Manager();
}
}
}

