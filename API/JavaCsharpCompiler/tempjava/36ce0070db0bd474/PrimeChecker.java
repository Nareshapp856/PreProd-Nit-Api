public class PrimeChecker
{
int number;
public int isPrime( int number)
{
    int count=0;
    
    for(int i=0;i<=n;i++)
    {
    if(number%i==0)
    {
       count++; 
    }
    System.out.println(count);
    }
}
public static void main(String [] args)
{
  PrimeChecker p1=new PrimeChecker();
  p1.number=7;
  p1.isPrime(number);
}
}