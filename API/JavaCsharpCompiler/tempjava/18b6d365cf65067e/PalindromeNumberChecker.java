public class PalindromeNumberChecker
{
    int x;
    public void checkPalindrome(int num){
        int copy = num;
        int rev =0;
        while(num!=0)
        {
            rev = rev*10+(num%10);
            num= num/10;
        }
        if(copy==num)
        {
            System.out.println(copy+" is a palindrome number ");
        }
        else
        {
            System.out.println(copy+"is not a palindrome number");
        }

    }
    public Static void main (String [] args)
    {
        PalindromeNumberChecker p1 = new PalindromeNumberChecker();
        p1.x = 121;
        checkpalindrome(p1.x);


    }
}