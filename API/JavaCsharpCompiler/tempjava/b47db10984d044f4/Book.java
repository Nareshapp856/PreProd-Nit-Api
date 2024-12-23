 class Book
{
    String title;
    int yearPublished;
    public void displayDetails()
    {
       System.out.println("Title:"+);
         System.out.println("Year Published:"+);
    }
    public void updateYear(int newYear)
    {
     System.out.println("After updating the year of publication:"+newYear);
    }
    public void checkClassic(int currentYear)
    {
        if(yearPublished<=currentYear)
        {
            System.out.println("true");
        }
        else{
            System.out.println("false");
        }

    }
    public static void main(String[] args)
    {
        Book b1=new Book();
        b1.title="Atomic Haibits";
        b1.yearPublished=1925;
     b1.displayDetails();
        b1.updateYear(1930);
        b1.checkClassic(2024);
    }
}