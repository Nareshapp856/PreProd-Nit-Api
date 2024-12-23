
    private String name;
    private int id;
    private String specialization;

    // Default constructor
    public Teacher() {
        this.name = "Unknown";
        this.id = 0;
        this.specialization = "General";
    }

    // Parameterized constructor
    public Teacher(String name, int id, String specialization) {
        this.name = name;
        this.id = id;
        this.specialization = specialization;
    }

    // Method to display teacher details
    public void displayDetails() {
        System.out.println("Teacher Name: " + name);
        System.out.println("Teacher ID: " + id);
        System.out.println("Specialization: " + specialization);
    }
}
2. ClassDetails Class (Derived Class)
java
Copy code
// Derived Class: ClassDetails
class ClassDetails extends Teacher {
    private String className;
    private int numberOfStudents;

    // Default constructor
    public ClassDetails() {
        super();  // Call the parent constructor (Teacher)
        this.className = "Not Assigned";
        this.numberOfStudents = 0;
    }

    // Parameterized constructor
    public ClassDetails(String name, int id, String specialization, String className, int numberOfStudents) {
        super(name, id, specialization);  // Call the parent constructor (Teacher)
        this.className = className;
        this.numberOfStudents = numberOfStudents;
    }

    // Method to display class details
    public void displayClassDetails() {
        displayDetails(); 
        System.out.println("Class Name: " + className);
        System.out.println("Number of Students: " + numberOfStudents);
    }
}
3. TeacherTester Class
java
Copy code
// Class to test the functionality
public class TeacherTester {
    public static void main(String[] args) {
       
        ClassDetails teacherClass = new ClassDetails("Jane Smith", 301, "Physics", "10th Grade", 40);

        // Call the displayClassDetails method to print the details
        teacherClass.displayClassDetails();
    }
}