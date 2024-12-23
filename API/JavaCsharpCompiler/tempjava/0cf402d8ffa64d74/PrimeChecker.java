class PrimeChecker
{
  int number,c=0;
  boolean isPrime;  
  public static void isPrime()
  {
    for(int i=0;i<=number;i++)
    {
        if(number%i==0)
        {
            if(c==2)
        System.out.println(number+"The number is prime");
        }
        else
        {
            System.out.println(number+"The number is not prime");
        }
    }
    public static void main(String[] args)
    {
        PrimeChecker p=new PrimeChecker();
        p.number=7;
        System.out.println("primeStatus"+isPrime);
    }

        
    
  }
}