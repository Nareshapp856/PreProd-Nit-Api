public class PrimeChecker
{
    int num;
    boolean isPrime=true;
    public void isPrime()
    {
        if(num%1==0 && num%num==0)
        {
            System.out.println("Its a Prime Number : "+num);
        }
        else
        {
            System.out.println("Not a Prime");
        }

    }
    public void primeStatus()
    {
        if(isPrime())
        {
        System.out.println("The number is prime"+isPrime);
         
        }
        else
        {
            System.out.println("The number is not prime");
        }
    }
    public static void main(String []args)
    {
        PrimeChecker p1=new PrimeChecker();
        p1.num=7;
        p1.primeStatus();
    }

}