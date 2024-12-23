class Book{
    String title;
    int yearPublished;

    public void displayDetails(){
        System.out.println("Book Title"+title);
        System.out.println("Year Published :"+yearPublished);
    }

    public void updateYear(){
        int new_Year = 1930;
        new_Year = yearPublished;
        System.out.println("Year Published :"+new_Year);

    }

    public void checkClassic(){
        int current_Year = 1925;
        current_Year = yearPublished;
        System.out.println("Year Published :"+current_Year);

    }
    public static void main(String []args){
        Book b1 = new Book();
        b1.title = "The Great Gatsby";
        b1.yearPublished = 1925;
        b1.updateYear();
        b1.displayDetails();
        b1.checkClassic();
    }
}