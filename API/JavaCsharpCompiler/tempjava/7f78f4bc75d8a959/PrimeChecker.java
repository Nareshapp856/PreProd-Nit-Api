public class PrimeChecker 
{
int num;
boolean isPrime;
public void isPrime()
{
 if (num <= 1)
         {
            isPrime = false;
        }
         else 
         {
            for (int i = 2; i <= (num); i++)
            {
                if (num % i == 0) {
                    isPrime = false;
                   
                }
            }
        }

}
public void primestatus()
{
        if (isPrime) {
            System.out.println(num + " is a prime number.");
        } else {
            System.out.println(num + " is not a prime number.");
        }
}
    public static void main(String[] args)
     {
         PrimeChecker p1=new  PrimeChecker();
         p1.isPrime();
         p1.primestatus();
         p1.num=7;

       
       
    }
}
