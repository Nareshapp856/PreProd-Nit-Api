

class Checknum{
     public  void isPalindrome(int num){
	    int cpy=num,rev=0,rem;
		while(num!=0)
		{
		rem=num%10;
		rev=rev*10+rem;
		num=num/10;
		}
		if(cpy==rev)
		{
		    System.out.println(cpy+": is Palindrome number");
		}
		else
		{
		   System.out.println(cpy+": is not Palindrome number");
		}
	 
	 }
	
	 public static void main(String[] args){
		 
			 int n=151;
			 isPalindrome(n);
		 
		
		
	 }

}