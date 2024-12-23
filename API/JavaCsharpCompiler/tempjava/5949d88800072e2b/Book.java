public class Book{
    String title;
    int yearPublished;
public void displayDetails(){
System.out.println("Book Title: "+title+"Year Published: "+yearPublished);
System.out.println("After updating the year of publication:");
System.out.println("Book Title: "+title+"Year Published: "+updateYear());

checkClassic();
}
public void updateYear(int newYear){

    System.out.println(newYear);
}
public void checkClassic(int currentYear)
{
    boolean flag;
    
    if(yearPublished<=currentYear)
    {
        if(yearPublished<=(currentYear-50))
        {flag=true;
        System.out.println("Is the book a classic ? "+flag);
        }
    }
    else
    {
        flag=false;
        System.out.println("Is the book a classic ? "+flag);
    }
}

    public static void main(String []args){
   
   Book b1=new Book();
   b1.title="The Great Gatsby";
   b1.yearPublished=1925;
   b1.displayDetails();
   int currentYear=2024;
    updateYear=1930;
    b1.displayDetails();


    }
}