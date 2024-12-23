public class Main {
    private String name;
    private double marks;

    public Main(String name,double marks) {
        this.name = name;
        this.marks = marks;
    }

    public void displayDetails() {
        System.out.println("Student Name: " + name + ", Marks: " + marks);
    }

    public void updateMarks(double newMarks) {
        this.marks = newMarks;
    }

    public void hasPassed() {
        System.out.println("Has the student passed? " + (marks >= 50));
    }

    public void calculateGrade() {
        char grade;
        if (marks >= 85) {
            grade = 'A';
        } else if (marks >= 70) {
            grade = 'B';
        } else if (marks >= 50) {
            grade = 'C';
        } else {
            grade = 'F';
        }
        System.out.println("Student's Grade: " + grade);
    }

    public static void main(String[] args) {
        Main student1 = new Main("Kathy", 72);
        student1.displayDetails();
        System.out.println("\nAfter updating marks to 88:");
        student1.updateMarks(88);
        student1.displayDetails();
        student1.hasPassed();
        student1.calculateGrade();
    }
}
        








