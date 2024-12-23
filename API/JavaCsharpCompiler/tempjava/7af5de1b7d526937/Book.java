public class Book{
    String title="The Great Gatsby";
    int yearPublished=1925;
    public void displayDetails(){
              System.out.println("Book title "+title+",year Published "+yearPublished);

    }
    public void updateYear(int newYear){
   System.out.println("After updating the year of publication: ");
  System.out.println("Book title "+title+",year Published "+newYear);
    }
     public void checkClassic(int currentYear){
         System.out.print("Is the book a classic ?");
         
        if(yearPublished-currentYear<50){
             System.out.print("True");
        }
        else{
             System.out.print("false");
        }
    }
    public static void main(String[]args){
        Book p =  new Book();
        p.yearPublished;
        p.displayDetails();
        p.updateYear(1930);
        p.checkClassic(p.yearPublished);
    }

}