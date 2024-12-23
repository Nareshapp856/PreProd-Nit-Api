class Teacher{
    private String name;
    private int id;
    private String specialization;
    Teacher(String name,int id ,String specialization){
        this.name=name;
        this.id=id;
        this.specialization=specialization;
    }
    public void displayDetails(){
        System.out.println("Name:- "+name+"\nId:-"+id+"\nspecialization:-"+specialization);

    }
}

class Subject extends Teacher{
    private String subjectName;
    Subject(String name,int id ,String specialization,String subjectName){
        super(name,id,specialization);
        this.subjectName=subjectName;

    }
    public void displaySubject(){
        displayDetails();
        System.out.println("Subject:-"+subjectName);
    }
}

public class Tester{
    public static void main(String []args){
        Subject s = new Subject("John Due",201,"Mathematics","Algebra");
        s.displaySubject();
    }
}