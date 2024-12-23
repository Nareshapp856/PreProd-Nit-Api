class DigitSum
{
   /* public int getNthDigitFromRight(int n)
    {
        int rev=0;
        while(n!=0)
        {
            rev=rev*10+n%10;
            n/=10;
        }
        int firstD=rev%10;
        while(i<=rev)
        {
            rd=n%10;
            n=n/10;
            i++;
        }
        return(rd+firstD);
    }*/
    public int addFirstAndNthDigit(int n,int num)
    {
        int rev=0;
        while(num!=0)
        {
            rev=rev*10+num%10;
            num/=10;
        }
        int firstD=rev%10;
        while(i<=n)
        {
            rd=num%10;
            num=num/10;
            i++;
        }
        return(rd+firstD);
    }
    public static void main(String []args)
    {
        DigitSum d1= new DigitSum();
        System.out.prinln(""+(d1.addFirstAndNthDigit(4,12345)));
    }

}