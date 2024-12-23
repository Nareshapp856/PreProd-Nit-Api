public class Book{
    String title;
    int yearPublished;
    public void displayDetails(){
              System.out.println("Book title "+title+",year Published"+yearPublished);

    }
    public void updateYear(int newYear){
   System.out.println("After updating the year of publication: ");
  System.out.println("Book title "+title+",year Published"+newYear);
    }
     public voidcheckClassic(int currentYear){
         System.out.print("Is the book a classic ?");
        if(newYear-currentYear<50){
             System.out.print("True");
        }
        else{
             System.out.print("false");
        }
    }
    public static void main(String[]args){
        Book p =  new Book();
        p.title="he Great Gatsby";
        p.yearPublished=1925
        p.displayDetails();
        p.updateYear(1930);
    }

}