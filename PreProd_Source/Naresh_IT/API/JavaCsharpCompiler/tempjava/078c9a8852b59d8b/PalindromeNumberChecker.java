class PalindromeNumberChecker
{
    public static boolean isPrime(int n)
    {
        int original=n;
        int reverse=0;
        if(n<0)
        {
            return false;
        } 
        do
        {
           int digit=n%10;
           reverse=reverse * 10 + digit;
           n/10;
        }
        while(n!=0)
        {
            return original==reverse;
        }
        
    }

    public static void main (String [] args)
    {
        int num=121;
        if(isPrime(num))
        {
            System.out.println(num+"The number is palindrome");
        }
        else
        {
            System.out.println(num+"The number is not palindome");
        }

    }
}