public class Student{
    String name = "Shahajan";
    double marks = 71;
    public void displayDetails(){
        System.out.println("Student Name: "+name);
        System.out.println("Marks: "+marks);
    }
    public void updateMarks(double newMarks){
        marks = newMarks;

    }
    public void hasPassed(){
        if(marks > 50){
            System.out.println("True");
        }
        else{
            System.out.println("False");
        }
    }
    public void calculateGrade(){
        char Grade;
        if(marks > 85){
            Grade = 'A';
        }
        else if(marks<= 84 && marks >= 70){
            Grade = 'B';
        }
        else if(marks <= 69 && marks >= 50){
            Grade = 'C';
        }
        else if(marks < 50){
            Grade = 'F';
        }
    }
    public static void main(String []args){
        // Student.name = "Shahajan";
        // Student.marks = 72;
        Student s1 = new Student()
        b1.displayDetails();
    }
}