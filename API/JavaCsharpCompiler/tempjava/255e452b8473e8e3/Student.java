public class Student{
    String name="Kathy";
   double marks=72;
   public void displayDetails(){
    System.out.println("Student name "+name+", Marks "+marks);

    }
    public void updateMarks(double newMarks){
        System.out.println("After updating marks to "+newMarks);
              System.out.println("Student name "+name+", Marks "+newMarks);

    }
    public void hasPassed(){
        System.out.print("Has the student passed ?");
         if(marks>50){
            System.out.println("True");
         }    
         else{
            System.out.println("False");
         }

    }
    public void calculateGrade(){
       System.out.println(updateMarks());

    }
    
    public static void main(String[]args){
        int newmarks=88;
        Student p =  new Student();

        p.displayDetails();
        p.updateMarks(newmarks);
        p.hasPassed();
        p.calculateGrade();
    }

}