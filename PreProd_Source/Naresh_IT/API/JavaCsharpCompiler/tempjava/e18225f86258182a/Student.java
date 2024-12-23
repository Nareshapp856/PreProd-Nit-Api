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
         if(marks>50){
            System.out.println("Passed");
         }    
         else{
            System.out.println("Failed");
         }

    }
    public void calculateGrade(){
 
    }
    
    public static void main(String[]args){
        Student p =  new Student();
        p.displayDetails();
        p.updateMarks(88);
        p.hasPassed();
        p.calculateGrade();
    }

}