public class Book{
    String title;
    int yearPublished;
    public void displayDetails(){
        System.out.println("Title");
        System.out.println("yearPublished");
    
    }
    public void updateYear(int newYear){

    }
    public void checkClassic(int currentYear){
        if(1925<=50)
        {
          System.out.println("true");
        }
        else{
            System.out.println("false");
        }

    }
    public void main(String[]args){
        Book b1=new Book();
        b1.Book Title="The Great Gatsby";
        System.out.println("Book Title"+Book Title);
        b1.yearPublished= 1925;
        System.out.println("yearPublished"+yearPublished);
        displayDetails();
    }

}