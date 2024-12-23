public class Student{
    String name = "Shahajan";
    double marks = 71;
    public void displayDetails(){
        System.out.println("Student Name: "+name+", Marks: "+marks);
    }
    public void updateMarks(double newMarks){
        marks = newMarks;
        System.out.println("After updating marks to "+marks);

    }
    public void hasPassed(){
        if(marks > 50){
            System.out.println("Has the student passed ?True");
        }
        else{
            System.out.println("Has the student passed ?False");
        }
    }
    public void calculateGrade(){
        char Grade;
        if(marks > 85){
            Grade = 'A';
            System.out.println("Student's Grade: "+Grade);
        }
        else if(marks<= 84 && marks >= 70){
            Grade = 'B';
            System.out.println("Student's Grade: "+Grade);
        }
        else if(marks <= 69 && marks >= 50){
            Grade = 'C';
            System.out.println("Student's Grade: "+Grade);
        }
        else if(marks < 50){
            Grade = 'F';
            System.out.println("Student's Grade: "+Grade);
        }
    }
    public static void main(String []args){
        Student s1 = new Student();
        s1.displayDetails();
        double a = 88;
        s1.updateMarks(a);
        s1.hasPassed();
        s1.calculateGrade();
    }
}