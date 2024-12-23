public class Movie
{
    String title="The Godfather";
    int releaseYear=1972;

    public void displayDitails()
    {
        System.out.println(" movie title :"+title+",relese year:"+releaseYear);
    }
    
    public  void updateReleaseYear(int newReleaseYear)
    {
        int newYear=1975;
        System.out.println("the update release year is"+newYear);
    }   
    
    public void checkAwardWinner(int currentYear)
    {  

    } 
    public static void main(String[]args){
    Movie m1=new Movie();
    String title="The Godfather";
    int releaseYear=1972;
    m1.displayDitails();
    m1.updateReleaseYear(1975);
    }
}

