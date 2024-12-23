class Employee{
    private String name;
    Private int id;
    private double salary;
    public Employee(String name,int id,double salary){
        this.name=name;
        this.id=id;
        this.salary=salary;
        System.out.println("Name:"+name);
        System.out.println("Id:"+id);

    }
    public double calculateSalary(){
        return salary;
    }
}
    class Developer extends Employee{
        private double hra;
        public Developer(String name,int id,double salary,double hra){
            super(name,id,salary);
            this.hra=hra;
        }
        public void calculateSalary(){
        salary=salary+hra;

        }
    }
    class Manager extends Employee{
        private double ta;
        private double fa;
        public Manager(String name,int id,double salary,double ta,double,fa){
            super(name,salary,id);
            this.ta=ta;
            this.fa=fa;
        }
        public void calculateSalary{
            salary=ta+fa;

        }
    }
    public class EmployeeTester{
        Developr e1 = new Developer("xyz",123,40000,2000);
        e1.calculateSalary();
        Manager e2 = new Manager("abc",456,30000,500,800);
        e2.calculateSalary();
    }


    


