public class PrimeChecker{
    public static void isPrime(int n)
    {
        int c=0;
        for(int i=1;i<=n/2;i++){
            if(n%i==0)
            {
                c++;
            }
        }
        if(c==2)
        {
            System.out.println("The number is prime");
        }
        else
        {
             System.out.println("The number is not prime");
        }
    }
public static void main(String[]args){
int a=7;
isPrime(a)
}
}