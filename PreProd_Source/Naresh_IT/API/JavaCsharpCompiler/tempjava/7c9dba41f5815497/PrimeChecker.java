public class PrimeChecker
{
    int number,c=0;
    boolean isPrime;
    public  void isPrime()
    {
        if(number>1)
        {
        System.out.println("the number is prime");
        }
        else{
            System.out.println
        ("The number is not a prime");
        }

    }
    public  void primeStatus()
    {
        int number=7;
        for(int i=1;i<=number;i++)
        {
            if(number%i==0)
            {
                c++;
			}
		}
                if(c==2){
                
                 System.out.println(number+"is prime");
                }
                else
                {
                System.out.println(number+"The number is not a prime");
                }
        }

        public static void main(String args[])
        {
            PrimeChecker p=new PrimeChecker();
            //p.number=10;
            p.isPrime();
        }
}

        

 

  