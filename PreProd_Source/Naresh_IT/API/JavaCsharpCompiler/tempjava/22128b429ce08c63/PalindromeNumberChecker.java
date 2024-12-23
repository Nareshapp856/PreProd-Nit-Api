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
            System.out.println("The number is a palindrome");
            else
            System.out.println("The number is not a palindrome");
        }
    public static void main(String args[]){
        PalindromeNumberChecker p= new PalindromeNumberChecker();
        p.num=121;
        p.checkPalindrome(p.num);
    }
}