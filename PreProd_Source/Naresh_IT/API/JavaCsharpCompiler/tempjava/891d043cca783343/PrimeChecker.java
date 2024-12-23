public class PrimeChecker{
int number;
boolean isPrime;

public void checkPrime(int number){
int i;
int count=0;
for(i=0;i<=num/2;i++)
{if(num%i==0){count++;}}
if(count==1)
{isPrime=true;}
primestatus(isPrime);
}
public void primestatus(boolean isPrime){
if(true)
{System.out.println("The number is prime");}
else
{
System.out.println("The number is not prime");

}
}

public static void main(String[]args){
PrimeChecker P1=new PrimeChecker();
P1.number=10;
P1.checkPrime();
}
}