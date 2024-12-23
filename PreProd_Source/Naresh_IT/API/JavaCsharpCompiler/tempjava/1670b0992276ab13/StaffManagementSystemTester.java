package com.java.practice;

class Staff
{
    String name;
    int id;

    public Staff(String name, int id)
    {
        this.name =name;
        this.id=id;
    }

    public void displayInfo()
    {
        System.out.println("Staff Member Name: "+name);
        System.out.println("Staff Id: "+id);
    }
}

class Faculty extends Staff
{
    String department;

    public Faculty(String name, int id)
    {
        super(name, id);
        this.name = name;
        this.id = id;
    }

    public Faculty(String name, int id, String department)
    {
    	super(name, id);
        this.department = department;
    }
    
    public void teachSubject()
    {
        super.displayInfo();
        System.out.println("department the faculty member is teaching: "+department);
    }
}

class Professor extends Faculty
{
    String researchArea;

    public Professor(String name, int id, String department)
    {
        super(name, id, department);
       this.name = name;
    this.id = id;
    this.department = department;  
    }

    public Professor(String name, int id, String department, String researchArea)
    {
    	super(name, id, department);
    this.researchArea = researchArea; 
    }

    public void conductResearch()
    {
        super.teachSubject();
        System.out.println("Research area of the professor: "+researchArea);
    }
}

public class StaffManagementSystemTester
{
    public static void main (String[] args)
    {
        Professor E1 = new Professor("Shyam", 123, "CSE", "Computer Lab");
        E1.conductResearch();
        
    }
}



