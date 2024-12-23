public class Book{
    String title;
    int yearPublished;
    public void displayDetails(){
        System.out.println("Book Title:"+);
        System.out.println("Year of Published:");
    }
    public void updateYear(int newYear){
          yearPublished=newYear;
    }
    public void checkClassic(int currentYear){
          
           if(currentYear>50){
               
           }
    }
    public static void main(String[] args){
        Book b1=new Book();
        b1.displayDetails();
        b1.updateYear();
        b1.checkClassic();
    }

}