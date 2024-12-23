public class PrimeChecker{
    int n;
    boolean isPrime;
    public void isPrime(){
        int count=0;
        for(int i=1;i<n/2;i++)
        {
            count++;
        }
        if(count==2)
        {
            isPrime=true;
        }
        else
        {
            isPrime=false;
        }
    } 
    public void primeStatus(){
        isPrime();
        System.out.println("The number is prime");
        System.out.println("The number is not prime");
    }
    public static void main(String []args)
    {
        int n=7;
        PrimeChecker p1=new PrimeChecker();
        p1.primeStatus();
    }
}