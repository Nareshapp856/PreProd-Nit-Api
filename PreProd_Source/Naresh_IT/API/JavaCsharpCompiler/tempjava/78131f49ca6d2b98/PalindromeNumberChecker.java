class Choice
{
	public void isPalindrome(int num)
	{
		int m=num;
		int rev=0;
		while(num>0)
		{
			int r=num%10;
			rev=rev*10+r;
			num=num/10;
		}
		if(m==rev)
		{
			System.out.println(m+"is a palindrome");
		}
		else
			System.out.println("Not a palindrome");
	}
	public void isPerfect(int num)
	{
		int sum=0;
		for(int i=1;i<=num/2;i++)
		{
			if(num%i==0)
			{
				sum=sum+i;
			}
		}
		if(num==sum)
		{
			System.out.println(num+" perfect number");
		}
			else
			{
				System.out.println(num+"not perfect number");
			}
	}
	public static void main(String[]args)
	{
		Choice c1 = new Choice();
		int ch=2,num=6;
		switch(ch)
		{
			case 1:c1.isPalindrome(num);
			break;
			case 2:c1.isPerfect(num);
			break;
			default:System.out.println("Invalid choice");
		}
	}
}