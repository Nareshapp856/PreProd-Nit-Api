class Book
{
    String title;
    int yearPublished;
    public void displayDetails()
    {
        System.out.println("Book Title:"+title);
        System.out.println("Year Published:"+yearPublished);
    }
    public void updateYear(int newYear)
    {
        System.out.println("Book Title:"+title)
       System.out.println("YearPublished:"+yearPublished);
    }
    public void checkClassic(int currentYear)
    {
        if(yearPublished <= currentYear - 50)
        {
            System.out.println("is the book a classic ?"+true);
        }
        else
        {
            System.out.println("false");
        }
    }
    public static void main(String []args)
    {
        Book b1=new Book();
        b1.displayDetails();
        b1.updateYear();
        b1.checkClassic();
    }
}