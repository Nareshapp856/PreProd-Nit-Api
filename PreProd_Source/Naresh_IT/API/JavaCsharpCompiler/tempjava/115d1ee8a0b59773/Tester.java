class Teacher{
    String name;
    int id;
    String specialization;
    
    Teacher(){
        this.name = "Unknown";
        this.id = 0;
        this.specialization = "General";
    }

    Teacher(String name, int id, String specialization){
        this.name = name;
        this.id = id;
        this.specialization = specialization;
    }

    public void displayDetails(){
        System.out.println("Name: "+this.name);
        System.out.println("ID: "+this.id);
        System.out.println("Specialization: "+this.specialization);
    }
}

class Subject extends Teacher{
    private String subjectName;

    Subject(){
        super();
        this.subjectName = "Not Assigned";
    }  

    Subject(String name, int id, String specialization, String subjectName){
        super(name, id, specialization);
        this.subjectName = subjectName;
    } 

    public void displaySubject(){
        super.displayDetails();
        System.out.println("Subject name : "+this.subjectName);
    }
}

public class Tester{
    public static void main(String [] args){
        Subject s = new Subject("John Doe", 201, "Mathematics", "Algebra");
        s.displaySubject();

    }
}
/*
Name: John Doe
ID: 201
Specialization: Mathematics
Subject name : Algebra
*/