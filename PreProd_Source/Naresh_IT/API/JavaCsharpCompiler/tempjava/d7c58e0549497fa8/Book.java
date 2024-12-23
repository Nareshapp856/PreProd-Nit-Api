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
        if(yearPublished > 50)
        {
            System.out.println("true");
        }
        else(yearPublished <= 50)
        {
            System.out.println("false");
        }
    }
    public static void main(String []args)
    {
        Book b1=new Book();
        b1.displayDetails();
        b1.title="The Great Gatsby";
        b1.yearPublished=1925;
        Book b2=new Book();
        b2.title="The Great Gatsby";
        b2.yearPublished=1930;
        b2.updateYear();
        checkClassic();
    }
}