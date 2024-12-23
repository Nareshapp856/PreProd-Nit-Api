public class Book{
    String title;
    int yearPublished;
    public void displayDetails(){
        System.out.println("title of the book is:"+title);
        System.out.println("yearPublished is:"+yearPublished);
    }
    public void updateYear(int newYear){
        System.out.println("after upating the year of publication:"+newYear);
    }
    public void checkClassic(int currentYear){
        if(yearPublished<=currentYear-50){
            System.of.println("true");
        }
        else{
            System.out.println("false");
        }
    }
    public static void main(String args[]){
        Book b=new Book();
        b.title="THe Great Gatsby";
        b.yearPublished=1925;
        b.displayDetails();
        b.updateYear(1930);
        b.checkClassic(2014);
    }
}