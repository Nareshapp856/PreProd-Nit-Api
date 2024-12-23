public class  Movie{
    String title;
    int releaseYear;
    public void displayDetails(){
        System.out.println("TitleOfTheMovie"+title);
         System.out.println("ReleaseYear"+releaseYear);
    }
    public void updateReleaseYear(int newReleaseYear){
        newReleaseYear=2024;

    }
    public void checkAwardWinner(int currentYear){
        if((releaseYear<=currentYear)-20){
            System.out.println("Indicating that the movie might have won awards by now");
        }
        else{
            System.out.println("true");
        }
    }
    public static void main(String []args){
        Movie m=new Movie();
        m.title="Godfather";
        m.releaseYear=1972;
    }
}