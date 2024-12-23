class DigitSum
{
    int num;
    public int getNthDigitFromRight(int n)
    {
        int t = num,ans=0;
        while(n--)
        {
            ans = t%10;
            t /= 10;
        }
        return ans;
    }
    public void addFirstAndNthDigit(int n)
    {
        int p,add;
        p = getNthDigitFromRight(n);
        do
        {
            add = num%10;
            num /= 10;
        }while(num!=0)
    }
}
class DigitSumTester
{
    public static void main(String args[])
    {
        DigitSum a = new DigitSum();
        a.num = 145;
        int p = 2;
        a.addFirstAndNthDigit(p);
    }
}