public class Student
{
    String name;
    double marks;
    public void displayDetails()
    {
        System.out.print("Student Name"+name);
        System.out.println(",Marks"+marks);
    }
    public void updateMarks(double newMarks)
    {
        marks+=newMarks;
    }
    public void hasPassed()
    {
        if(marks>=50)
        {
            System.out.println("true");
        }
        else
        {
            System.out.println("false");
        }
    }
    public void calculateGrade()
    {
        if(marks>=85)
        {
            System.out.println("A");
        }
        else if(marks>=70 && marks<=80)
        {
            System.out.println("B");
        }
        else if(marks>=50 && marks<=69)
        {
            System.out.println("C");
        }
        else
        {
            System.out.println("Fail");
        }
    }
    public static void main(String args[])
    {
        Student s=new Student();
        s.name="Kathy";
        s.marks=72;
        s.displayDetails();
        s.updateMarks(16);
        System.out.println("Has the student passed ?");
        s.hasPassed();
        System.out.println("Student's Grade");
        s.calculateGrade();
    }
}