public class Student{
    String name;
    double marks;
    public void displayDetails(){
        System.out.println("Student Name: "+name);
        System.out.println("Marks:  "+marks);
    }
    public void updateMarks(double newMarks){
        newMarks=newMarks+marks;
        System.out.println("After updating marks to "+newMarks+ ":");
        System.out.println("Student Name: "+name);
        System.out.println("Marks:  "+newMarks);
    }
    public void hasPassed(){
        System.out.println("Has the student passed ?");
        if(marks>=50){
            System.out.println("true");
        }else{
             System.out.println("false");
        }
    }
    public void calculateGrade(){
        System.out.println("Student's Grade:");
        if(marks>85){
            System.out.println("A");
        }else if(marks>70 && marks<84){
            System.out.println("B");
        }else if(marks>50 && marks<69){
            System.out.println("C");
        }else if(marks<50){
            System.out.println("F");
        }
    }
    
    public static void main(String []args){
        Student s1 = new Student();
        s1.displayDetails();
        s1.updateMarks(16);
        s1.hasPassed();
        s1.calculateGrade();
        s1.name="Kathy";
        s1.marks=72;
    }
}