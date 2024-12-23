
 class Employee
 {  
    private String name;  
    private int id;  
    private double salary;  

 
    public Employee() 
    
    
    {  
        this.name = name;  
        this.id = 0;  
        this.salary = 0.0; 
    }  


    public Employee(String name, int id, double salary) 
    {  
        this.name = name;  
        this.id = id;  
        this.salary = salary;  
    }  

    
    public double calculateSalary() 
    {  
        return salary;  
    }  

  
    public String getName()
     {  
        return name;  
    }  

    public int getId() {  
        return id;  
    }  

    public double getSalary() {  
        return salary;  
    }  
}  

 class Developer extends Employee
 {  
    private double hra;  

    
    public Developer() 
    {  
        super();  
        this.hra = 0.0;  
    }  

    
    public Developer(String name, int id, double salary, double hra) 
    {  
        super(name, id, salary);  
        this.hra = hra;  
    }  

    
    @Override  
    public double calculateSalary() 
    {  
        return super.calculateSalary() + hra;  
    }  
}  

 class Manager extends Employee 
{  
    private double ta; 
    private double foodAllowance;  

    
    public Manager() 
    {  
        super();  
        this.ta = 0.0;  
        this.foodAllowance = 0.0;  
    }  

     
    public Manager(String name, int id, double salary, double ta, double foodAllowance) 
    {  
        super(name, id, salary);  
        this.ta = ta;  
        this.foodAllowance = foodAllowance;  
    }  

    @Override  
    public double calculateSalary()
     {  
        return super.calculateSalary() + ta + foodAllowance;  
    }  
}
public class EmployeeTester {  
    public static void main(String[] args) {  
        
        Developer dev = new Developer("Alice", 101, 50000, 5000);  
        System.out.println("Developer: " + dev.getName() + " (ID: " + dev.getId() + ")");  
        System.out.println("Salary: " + dev.calculateSalary());  

         
        Manager mgr = new Manager("Bob", 201, 80000, 7000, 3000);  
        System.out.println("Manager: " + mgr.getName() + " (ID: " + mgr.getId() + ")");  
        System.out.println("Salary: " + mgr.calculateSalary());  
    }  
}