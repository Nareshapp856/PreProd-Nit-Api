public class Movie{
    String title;
    int releaseYear;
    public void displayDetails(){
        System.out.print("Movie Title:"+title);
        System.out.print(",Realeased Year:"+releaseYear);
        
    }
    public void updateReleaseYear(){
        System.out.print("Movie Title:"+title);
        System.out.print(",Realeased Year:"+releaseYear);
    }
    public void checkAwardWinner(int currentYear){
        System.out.println("Is the movie is award winner?");
        int p=currentYear;
        currentYear=currentYear-20;
        if(p>currentYear){
            System.out.println("true");
        }
        else
        {
            System.out.print("false");
        }
    }

    public static void main(String[]args){
        Movie c1=new Movie();
        c1.title="The Godfather";
        c1.releaseYear=1972;
        c1.displayDetails();
        System.out.println("\nAfter Updating Realeased Year:");
        Movie c2=new Movie();
        c2.title="The Godfather";
        c2.releaseYear=1975;
        c2.updateReleaseYear();
        c2.checkAwardWinner(2024);
    }
}