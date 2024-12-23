public class PrimeChecker
{
    int number;

    public void isPrime()
    {
        int count=0;
        for(int i=2; i<=n/2;i++)
        {
            if(number /i==0)
            {
                count++;
            }
       
        }
            if(count==0)
            System.out.println(number+"\nThe number is prime");
            else
            System.out.println(number+"The number is not prime");
        }
    } 
    public static void main(String args[])
    {
        PrimeChecker p=new PrimeChecker();
        number =23;
        p.isPrime();
        
    }

}