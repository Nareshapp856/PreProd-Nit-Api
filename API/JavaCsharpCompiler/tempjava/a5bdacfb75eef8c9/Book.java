import java.util.Scanner;
public class Book{
    String title;
    int yearPublished;
    public void displayDetails(){
        System.out.println("Book Title : "+title);
        System.out.println("Year Published : "+yearPublished);
    }
    public void updateYear(int newYear){
        yearPublished = newYear;
    }
    public void checkClassic(int currentYear){
        if(yearPublished <= (currentYear-50)){
            System.out.println("true");
        }else{System.out.println("false");}   
    }
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        Book b1 = new Book();
        // System.out.println("Enter Book title: ");
        b1.title = sc.nextLine();
        // System.out.println("Enter Year Published: ");
        b1.yearPublished=sc.nextInt();
        b1.displayDetails();
        b1.updateYear(1930);
        System.out.println("After updating the year of publication :");
        b1.displayDetails();
        System.out.print("Is the book a classic? ");
        b1.checkClassic(2024);



    }
}