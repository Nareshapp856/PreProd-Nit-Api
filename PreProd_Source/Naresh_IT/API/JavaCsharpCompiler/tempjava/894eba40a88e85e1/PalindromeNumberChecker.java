class Palindrome{
    int n;
    public void Palindrome(){
        int org = n,rem,rev=0;
        while(n!=0){
            rem = n%10;
            rev = rev*10+rem;
            n = n/10;
        }
        if(org==rev){
            System.out.println("The number is palindrome");
        } else{
            System.out.println("The number is not palindrome");
        }
    }
}
    class PalindromeNumberChecker{
    public static void main (String []args){
        PalindromeNumberChecker n1 = new PalindromeNumberChecker();
        n1.n = 121;
        n1.checkPalindrome();

    }

}