public DigitSumclass 
{
    public static void main(String[]args)
    {
        int n=123;
        int sum=0;
        while(n!=0)
        {
            int digit=n%10;
            sum=sum+digit;
            n=n/10;
            

        }
    }
}