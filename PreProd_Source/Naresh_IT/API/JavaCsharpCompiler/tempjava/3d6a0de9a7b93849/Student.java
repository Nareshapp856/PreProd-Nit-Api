public class Student{
    String name;
    double marks;
    public  void displayDetails()
    {
      System.out.println("name"+name);
       System.out.println("marks"+marks);
    }
    public void updateMarks(double newMarks)
    {
      marks=marks+newMarks;
    }
    public  void hasPassed()
    {
      if(marks>=50)
      {
        System.out.println("Ture");

      }
      else
      {
        System.out.println("Ture"); 
      }
      
    }
    public  void calculateGrade()
    {
      if(marks>=85)
      {
        System.out.println(" Grade : A");
      }
       else if(marks<=85 && marks>=70)
      {
        System.out.println(" Grade : B");
      }
      else if(marks<=69 && marks>=50)
      {
        System.out.println(" Grade : C");
      }
      else
      {
        System.out.println(" Grade : F");
      }
    }
    public static void main( String []args)
    {
      Student s1= new Student();
      s1.name="Naresh";
      s1.marks=72;
      double newMarks=88;

      s1.displayDetails();
      s1.updateMarks(s1.newMarks);
      s1. hasPassed();
      s1.calculateGrade();
        
    }

    
}