class  PrimeChecker
{
    int num;
    public static void checkPrime()
    {
        count=0;
        for(int i=0;i<=num;i++)
        {
            if(num%i==0)
            count++;
        }
        if(count>2)
        {
         System.out.print("The number isnot prime ");
        }
        else 
        System.out.printl("The number is prime");
    }
    public static displayPrimeStatus(){
        
    }
    public static void main(String[]args){
      PrimeChecker p1=new PrimeChecker();
      p1.num=7;
      checkPrime(num);
    }
}