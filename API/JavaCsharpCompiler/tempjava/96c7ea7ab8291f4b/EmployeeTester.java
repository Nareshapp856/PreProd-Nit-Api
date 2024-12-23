class Employee {
    private String name;
    private int id;
    private double salary;

    public Employee(String name,int id,double salary){
        super();
        this.name=name;
        this.id=id;
        this.salary=salary;
    }
    public void calculateSalary(){
        return salary;
        System.out.println(salary);
    }

    class Developer extends Employee{
        private double hra;
        
    
    public Developer(double hra){
        super();
        this.hra=hra;
    }
    
    
    public void calculateSalary(){
        System.out.println(salary+hra);
    }
    }
    
    class Manager extends Employee{
        private double ta;
        private double foodAllowance;

        public Manager(double ta,double foodAllowance){
            super();
            this.ta=ta;
            this.foodAllowance=foodAlloance;
        }
        public void calculateSalary(){
            System.out.println("ta"+(ta+salary));
            System.out.println("foodAllowance"+(foodAllowance+salary));
            

        }

    }
}
public class EmployeeTester{
    public static void main(String[]args){
       Employee e=new Employee("jonny",11,34000);
       e.calculateSalary();
       Developer e1 = new  Developer(2000);
       e1.calculateSalary();
       Manager m = new Manager(4000,8500);
       m.calculateSalary();
    }
}


