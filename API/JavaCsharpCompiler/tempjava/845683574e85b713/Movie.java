public class Movie
{ 
    String title;
    int releaseYear=1972;
    int newReleaseYear=1975;
    int currentYear=2024;

  
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
    if (releaseYear<currentYear){
      System.out.println("true");
    }
        else{
        System.out.println("false");
        }
    }
    public static void main(String [] args)
    {
        Movie ob=new Movie();
        ob.title="The Godfather";
        ob.displayDetails();
        System.out.println("After Updating the Release Year:");
        ob.updatedetails(1975); 
        System.out.println(checkAwardWinner());
    
  
       
    }
}