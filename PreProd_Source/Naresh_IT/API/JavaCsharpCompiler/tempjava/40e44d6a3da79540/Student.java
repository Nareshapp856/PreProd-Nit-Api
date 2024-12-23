public class Student
{
    String name;
    double marks;
    public void displayDetails()
    {
        System.out.println("Student Name:" +name);
        System.out.println("Marks:" +marks);
    }
    public void upadateMarks(double newMarks)
    {
        marks=newMarks;
       System.out.println("UpadateMarks:"+newMarks);
    }
    public void hasPassed()
    {
        if(marks>=50)
        {
            System.out.println(" Has the student passed?"+true);
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
            System.out.println("Student's Grade:" +A);
        }
        else if(marks==70|| marks==71 ||marks==72 || marks==73|| marks==74 || marks==75 marks==76 || marks==77 || marks==78 ||marks==79 marks==80 || marks==81 || marks==82 || marks==83
        marks==84)
        {
            System.out.println("Student's Grade:"+B);
        }
        else if(marks==50|| marks==51| marks==52 || marks==53|| marks==54 || marks==55 marks==56 || marks==57 || marks==58 ||marks==59 marks==60 || marks==61 || marks==62 || marks==63
        marks==64 || marks==65 || marks==66 || marks==67 || marks==68 || marks==69)
        {
            System.out.println("Student's Grade:"+C);
    }
     else(marks<=50)
    {
        System.out.println("Student's Grade:"+F);
    }
    }
    public static void main(String []args)
    {
        Student s1=new Student();
        s1.name=Kathy;
        s1.Marks=72;
        s1.upadateMarks(88);
        s1.calculateGrade();
    }
    
}


