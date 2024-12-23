public class Book{
    String title="The_Great_Gatsby";
    int yearPublished=1925;
    Boolean checkClassic=true;
    public void displayDetails(){
        System.out.println("Book Title:"+title);
        System.out.println("Year Published"+yearPublished);
        System.out.println("");

    }
    public void updateYear(int newYear){
        
System.out.println("After updating the year of publication:");
        System.out.println("Book Title:"+title);
        System.out.println("Year Published"+yearPublished);

    }
    public void checkClassic(int currentYear){
        if(currentYear<50){
        System.out.println("Is the book a classic ?true");
        }
        else if(currentYear>=50)
        {
          System.out.println("Is the book a classic ?false");
}
    }
    public static void main(String []args){
        Book b1=new Book();
       
        b1.displayDetails();
        book.updateYear(1930);
        b1.checkClassic(1990);
       
    }
}