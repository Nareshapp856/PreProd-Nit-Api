class Palindrome{
    int num;
    boolean ispalindrome;
    int copy=num;
    public void checkPalindorme(){
        for(int i=num;i!=0;i/=10){
            int k=num%10;
            int rev=(rev*10)+k;
        }
        if(rev==copy){
            System.out.println("The number is a palindrome");
        }
        else System.out.println("The number is not a palindrome");
    }
    public void PalindromeNumberChecker(){
    public static void main(String[]args){
        Palindrome p=new  Palindrome();
        p.num=121;
        p.PalindormeStatus();
    }
    }
}