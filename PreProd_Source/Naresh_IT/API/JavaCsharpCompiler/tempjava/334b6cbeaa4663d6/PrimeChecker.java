class PrimeChecker
{
  int number;
  boolean isPrime;  
  public static void isPrime()
  {
    for(int i=0;i<=number;i++)
    {
        if(number%i==0)
        {
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