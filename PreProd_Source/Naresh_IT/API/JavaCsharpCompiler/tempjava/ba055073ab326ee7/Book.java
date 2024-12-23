 public class Book{
   String title;
    int yearPublished;
    public void displayeDetails(){
        System.out.println("Book Title:"+title );
        System.out.println("Year Published :"+yearPublished );
        
    }
    public void updateYear(int Newyear){
        yearPublished=yearPublished+Newyear;

    }
    public void checkClassic(int currentYear){
        if(yearPublished-currentYear>=50){
            System.out.println("is the book a classic :" True);
        }else System.out.printl("is the book a classic :" False);

    }
    public static void main(String[]args){
        Book b1=new Book();
        b1.title="The Great Gatsby:"
        b1.displayeDetails();
        b1.yearPublished=1925;
        b1.yearPublished(1930);

        
    }
}