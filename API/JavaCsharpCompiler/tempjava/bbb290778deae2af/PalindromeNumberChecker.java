public static PalindromeNumberChecker
{
    int number;
    boolean isPalindrome;
    public void checkPalindrome()
    {
        int num=121;
        int rev=0;
        int digit;
        int copy=num;
        do
        {
          digit=num%10;
          rev=(rev*10)+digit;
          num=num/10;
        }while(num!=0);
        if(copy==num)
        {
            System.out.println(num+"The Number is a palindrome")
        }
        else
        {      
            System.out.println(num+"The Number is not a palindrome")
        }


    }
}