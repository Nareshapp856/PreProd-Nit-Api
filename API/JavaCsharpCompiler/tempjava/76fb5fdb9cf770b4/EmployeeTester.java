class Employee{
    private String name;
    private int id;
    private double salary;
    Employee(){

    }
    Employee(String name,int id,double salary){
        this.name=name;
        this.id=id;
        this.salary=salary;
    }

    public void calculateSalary(){
        System.out.println("Salary: "+salary);
    }
}
class Developer extends Employee
{
private double hra;
Developer(){

}
Developer(String name,int id,double salary,double hra){
    super(name,id,salary);
    this.hra=hra;
}
public void calculateSalary(){
    System.out.println("House Rent Allowance: "+hra);
}
}

class Manager extends Employee{
    private double ta;
    private double foodAllowance;
    Manager(){

    }

    Manager(String name,int id,double salary){
        super(name,id,salary);
        this.ta=ta;
        this.foodAllowance=foodAllowance;
    }

    public void calculateSalary(){
        System.out.println("")
    }
}


public class EmployeeTester{
    public static void main(String[]args){

    }
}