class Movie
{
    string title;
    int releaseYear;

    public void displayDetails()
    {
        System.out.println("title of the movie:"+title);
        System.out.println("release year:"+releaseYear);

    } 
    public void updateReleaseYear(int newReleaseYear){
         System.out.println("new release year:");
    }
    public void checkAwardWinner(int currentYear)
    {
        if(releaseYear<=20)
        {
            System.out.println("True");
        }
        else{
            System.out.println("Movie has been not yet received any awards");

        }
        public static void main(String args[]){
            Movie n=new Movie;
            n.title= "The Godfather";
            n.releaseYear="1972";
            n.displayDetails();
            n.updateReleaseYear(1975);
            n.checkAwardWinner();
        }

    }
}