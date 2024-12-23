public class PrimeChecker
{
    public static void main(String [] args)
    {
        int number=7,c=0;
        for(int i=0;i<=number;i++)
        {
            if(number%i==0)
            {
                c++;
                if(c==2)
                

                System.out.println(number+"is prime");
                }
                else
                {
                    System.out.println(number+"The number is not a prime");
                }
        }


    }
}
  