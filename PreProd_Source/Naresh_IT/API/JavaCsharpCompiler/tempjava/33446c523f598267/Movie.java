public class Movie
{ 
    String title;
    int releaseYear=1972;
    int newReleaseYear=1975;
    int currentYear;

  
    public void displayDetails()
    {
     System.out.println("Movie Title:"+title);
     System.out.println("Release Year:"+releaseYear);
    }
    public void updatedetails(int newReleaseYear)
    {
       System.out.println("Movie Title:"+title);
       System.out.println("Release Year:"+newReleaseYear);
    }
    public void checkAwardWinner(int currentYear)
    {
    if (currentYear>20)
        System.out.println("True");
        else
        System.out.println("False");
    }
    public static void main(String [] args)
    {
        Movie ob=new Movie();
        ob.title="The Godfather";
        ob.displayDetails();
        System.out.println("After Updating the Release Year:");
        ob.updatedetails(); 
  
       
    }
}