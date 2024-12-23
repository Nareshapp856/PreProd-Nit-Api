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
            System.out.println("Not a Prime Number : "+num);
        }

    }
    public void primeStatus()
    {
        if(num%1==0 || num%num==0)
        {
        System.out.println("The number is prime : "+isPrime);
         
        }
        else
        {
            System.out.println("The number is not prime"+isPrime);
        }
    }
    public static void main(String []args)
    {
        PrimeChecker p1=new PrimeChecker();
        p1.num=10;
        p1.isPrime();
        p1.primeStatus();
    }

}