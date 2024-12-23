public class EmployeeTester
{
private String name;
private int id;
private double salary;
public calculateSalary(String name,int id,double salary){
    this.name=name;
    this.id=id;
    this.salary=salary;
    return"["employee name is:"+name+"\nid is:"+id+"\nsalary is"+salary"]";
}

Developer extends EmployeeTester{
private double hra;
calculateSalary Employee(String name,int id,double salary,double hra){
this.hra=hra;
salary=salary+hra;
System.out.println("Salary is:"+salary);
}
}
Manager extends EmployeeTester{
    double ta;
    double foodAllowance;
}
    calculateSalary Manager(String name,int id,double salary,double ta,double foodAllowance){
    this.ta=ta;
    this.foodAllowance=foodAllowance;
    salary=salary+ta+foodAllowance;
    System.out.println("Salary is:"+salary);
}

}