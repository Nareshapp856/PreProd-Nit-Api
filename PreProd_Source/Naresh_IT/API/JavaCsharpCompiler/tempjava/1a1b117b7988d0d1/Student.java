public class  Student
{
    String name;
    double marks;

public void displayDetails()
{
    System.out.println("Student Name"+name);
    System.out.println("Student Marks"+marks);
}
public void updateMarks( double newMarks)
{
    marks = newMarks;
}
public void hasPassed()
{
 if(marks>=50){

 System.out.println("true");
 }
 else{
    
System.out.println("failed");
 }
}
public void  calculateGrade()
{
    if(marks>=85)
    {
        System.out.println("A");
    }
    else  if(marks>=70 && marks<=84)
    {
        System.out.println("B");
    }
    else  if(marks>=50 && marks<=69)
    {
        System.out.println("C");
    }
    else  if(marks<=50)
    {
        System.out.println("F");
    }
}
public static void main(String [] args)
{
   Student s1=new Student();
   s1.name="pranay";
   s1.marks=72d;
   s1.displayDetails();
   s1.updateMarks(88d);
   s1.hasPassed();
   s1.calculateGrade();
}
}