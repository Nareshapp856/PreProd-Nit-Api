class Book{
    String title;
    int yearPublished;
}
public void displayDetails(){
    System.out.println("Book title"+title);
     System.out.println(" year Published"+yearPublished);
    
}
public void updateYear(int newYear){
yearPublished=yearPublished-newYear;
System.out.println("Book title"+title);
System.out.println("year Published"+yearPublished);

}
public void  checkClassic(int currentYear){
    if(yearPublished<=currentYear){
        currentYear-50;
        return true;
    }
    else{
        return false;
    }
System.out.println("is the book a classic ?");

}
public static void main(String []args){
    Book b1=new Book();
    b1.title="The Great Gatsby";
    b1.yearPublished=1925;
    b1.displayDetails();
    b1. updateYear(1950);
    b1. checkClassic();
}