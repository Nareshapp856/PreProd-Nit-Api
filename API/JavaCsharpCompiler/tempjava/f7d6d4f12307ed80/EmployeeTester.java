public class EmployeeTeaster
{
private String name;
private int id;
private double salary;
 Employee(String name,int id,double salary){
    this.name=name;
    this.id=id;
    this.salary=salary;
  
}


class Developer extends EmployeeTeaster {
private double hra;
Developer(String name,int id,double salary,double hra){
super(name,id,salary,hra);
this.hra=hra;

}
}
class Manager extends EmployeeTeaster{
    double ta;
    double foodAllowance;
    Manager(String name,int id,double salary,double ta,double foodAllowance){
        super(name,id,salary,ta,foodAllowance)
    this.ta=ta;
    this.foodAllowance=foodAllowance;
   
}
public EmployeeTeaster{
    super(name,id,salary,hra,ta,foodAllowance);
    System.out.println("name:"+name+"id:"+id+"salary"+salary+"hra:"+hra+"ta:"+ta+"foodAllowance"+foodAllowance)
}
}
}