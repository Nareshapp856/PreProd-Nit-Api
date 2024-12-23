public class Student
{
    String name;
    double Marks;


    public void  displayDetails()
    {
        System.out.print("Student name:"+ name +",");
        System.out.println("Marks:"+Marks);


    }



    public void updateMarks(double marks)
    {
        Marks=marks;

    }

    public void hasPassed()
    {
        if(Marks>=50)
        {
            System.out.println("Has the student passed ? true");

        }
        else
        {
                    System.out.println("Has the student passed ? false");


        }

    }

    public void calculateGrade()
    {
        if(Marks>85)
        {
            System.out.println("Student's Grade:"+"A");
        }
        else if(Marks>70 && Marks<=84)
        {
            System.out.println("Student's Grade:"+"B");
        }

        else if(Marks>50 && Marks<=70)
        {
          System.out.println("Student's Grade:"+"C");

        }
        else
        {
            System.out.println("Student's Grade:"+"F");

            
        }


    }


    public static void main(String[]args)
    {

    }
}