public class PrimeChecker
{
int number;
public void isPrime( int number)
{
    int count=0;
    
    for(int i=0;i<=number;i++)
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
  p1.isPrime(7);
}
}