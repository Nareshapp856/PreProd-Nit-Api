 /*public class PalindromeNumberChecker{
    int num=121;
    int copy=num;
    int digit;
    int rev;
    boolean isPalindrome;
    public  void checkPalindrome()
    {
     digit=num%10;
     rev=(rev*10)+digit;
       num=num/10; 
       palindromeStatus();
    }
    public  void palindromeStatus()
    {
if(copy==rev)
{
    System.out.println("It is palindorme");
}
else
{
    System.out.println("It is not a palindorme");
}
    }
    public  void main(String[] args){
      
      checkPalindrome();
       
    }
}
*/

public class PalindromeNumberChecker{
    
    public static void checkPalindrome()
    {
        static int num=213;
    static int copy=num;
    static int digit;
    static int rev;
    boolean isPalindrome;
     digit=num%10;
     rev=(rev*10)+digit;
       num=num/10; 
       
    }
    public static void palindromeStatus()
    {
        copy=num;
    while(num!=0)
    
if(copy==rev)
{
    System.out.println("It is palindorme");
}
else
{
    System.out.println("It is not a palindorme");
    break;
}
    }
    public static void main(String[] args){
      
      checkPalindrome();
       palindromeStatus();
    }
}

/*

class PalindromeNumberChecker 
{

	public void checkPalindrome(int num) 
	{
		int rev=0,r;
		int temp=num;
		while(num!=0)
		{
			r=num%10;
			rev=rev*10+r;
			num/=10;
		}
		num=temp;
		if(num==temp)
		{
			System.out.println(num+" is a palindrome number");

	    }
	    else
		{
		System.out.println(num+" is not a palindrome number");
		}
	}
			
		
	public static void main(String[] args) 
	{
		Palindrome p=new Palindrome();
		p.checkPalindrome(121);
	}
}
*/
