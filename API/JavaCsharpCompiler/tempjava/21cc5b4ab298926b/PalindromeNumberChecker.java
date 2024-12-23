class PalindromeNumberChecker{
int num,rem,rev=0;
        int temp=num;

    public void checkPalindrome(int num){
            while(num!=0){
                rem=num%10;
                rev=rev*10+rem;
                num/=10;
            }
            if(temp==rev)
            System.out.println(temp+" is Palindrome!");
            else
            System.out.println(temp+" is not palindrome!");
        }
    public static void main(String args[]){
        PalindromeNumberChecker p= new PalindromeNumberChecker();
        p.num=121;
        p.checkPalindrome(p.num);
    
        

    }
}