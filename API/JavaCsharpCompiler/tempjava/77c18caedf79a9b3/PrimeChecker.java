public class PrimeChecker{
    int n;
    boolean isPrime;
    public void isPrime(){
        for(int i=1;i<n/2;i++)
        {
            int count++;
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
        PrimeChecker.isPrime();
        System.out.println("The number is prime");
        System.out.println("The number is not prime");
    }
    public static void main(String []args)
    {
        PrimeChecker p1=new PrimeChecker();
        p1.primeStatus(7);
    }
}