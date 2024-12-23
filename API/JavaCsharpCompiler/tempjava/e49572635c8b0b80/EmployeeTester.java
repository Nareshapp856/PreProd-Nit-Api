class Employee {
     String name;
     int id;
     double salary;
   
    
	public Employee(String name, int id, double salary) {
		super();
		this.name = name;
		this.id = id;
		this.salary = salary;
	}


	public double calculateSalary(){
        return this.salary;
    }
}
class Developer extends Employee  {
     double hra;
    
     public Developer(String name, int id, double salary, double hra) {
		super(name, id, salary);
		this.hra = hra;
	}

	public double calculateSalary(){
        return this.salary+this.hra;
    }
}
class Manager extends Employee {
       double ta;
       double foodAllowance;
    
     public Manager(String name, int id, double salary, double ta, double foodAllowance) {
		super(name, id, salary);
		this.ta = ta;
		this.foodAllowance = foodAllowance;
	}

	public double calculateSalary(){
        return this.salary+this.foodAllowance+this.ta;
    }
}
public class EmployeeTester{
    public static void main (String []args){
       Developer d1=new Developer("aashish",111,15000,5000);
       System.out.println(d1.calculateSalary()); 
       Manager m1=new Manager("aashish",111,15000,4000,6000);
       System.out.println(m1.calculateSalary());
    }
}