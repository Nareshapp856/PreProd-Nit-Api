
class Teacher {
    
    private String name;
    private int id;
    private String specialization;
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
class ClassDetails extends Teacher {
   
    private String className;
    private int numberOfStudents;

    public ClassDetails(String name, int id, String specialization, String className, int numberOfStudents) {
        super(name, id, specialization); 
        this.className = className;
        this.numberOfStudents = numberOfStudents;
    }
    public void displayClassDetails() {
        
        displayDetails();
       
        System.out.println("Class Name: " + className);
        System.out.println("Number of Students: " + numberOfStudents);
    }
}
public class TeacherTester {
    public static void main(String[] args) {
       
        ClassDetails teacher = new ClassDetails("raju", 301, "Physics", "10th Grade", 40);

   
        teacher.displayClassDetails();
    }
}
