class Teacher {  
    private String name;  
    private int id;  
    private String specialization;  

 
    public Teacher() {  
        this.name = "Unknown";  
        this.id = 0;  
        this.specialization = "General";  
    }  

   
    public Teacher(String name, int id, String specialization) {  
        this.name = name;  
        this.id = id;  
        this.specialization = specialization;  
    }  

  
    public void displayDetails() {  
        System.out.println("Teacher Name: " + name);  
        System.out.println("Teacher ID: " + id);  
        System.out.println("Specialization: " + specialization);  
    }  
}  

class Subject extends Teacher {  
    private String subjectName;  

  
    public Subject() {  
        super();   
        this.subjectName = "Not Assigned";  
    }  

  
    public Subject(String name, int id, String specialization, String subjectName) {  
        super(name, id, specialization); 
        this.subjectName = subjectName;  
    }  

 
    public void displaySubject() {  
        displayDetails();  
        System.out.println("Subject Name: " + subjectName);  
    }  
}  

public class Tester {  
    public static void main(String[] args) {  
        // Create an instance of the Subject class  
        Subject teacher = new Subject("John Doe", 201, "Mathematics", "Algebra");  
        
        // Display the teacher's details and the subject name  
        teacher.displaySubject();  
    }  
}  