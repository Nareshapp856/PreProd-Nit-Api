package com.badal.Practice;

class Employee
{
    private String name;
    private int id;
    private double salary;

    Employee()
    {

    }
    Employee(String name,int id,double salary)
    {
        this.name=name;
        this.id=id;
        this.salary=salary;
    }
    public double calculateSalary(double salary)
    {
        return 0.0;
    }
}

class Developer extends Employee
{
    private double hra;

    Developer()
    {

    }
    Developer(String name,int id,double salary,double hra)
    {
        super(name,id,salary);
        this.hra=hra;
    }

     public double calculateSalary(double salary )
    {
        salary=salary+hra;
        return salary;
        
    }

}

class Manager extends Employee
{
     private double ta;
     private double foodAllowance;

     Manager()
     {

     }

     Manager(String name,int id,double salary,double ta,double foodAllowance)
     {
        super(name,id,salary);
        this.ta=ta;
        this.foodAllowance=foodAllowance;
     }

      public double calculateSalary(double salary)
     {
           salary=salary+ta+foodAllowance;
          return salary;
     }
}


public class EmployeeTester
{
    public static void main(String[]args)
    {
    Developer d1=new Developer("Badal",21,5000.00,2000.00);
    System.out.println(d1);
    Manager m1=new Manager("Tushar",20,4000.00,2000.00,1500.00);
    System.out.println(m1);
    }
}

