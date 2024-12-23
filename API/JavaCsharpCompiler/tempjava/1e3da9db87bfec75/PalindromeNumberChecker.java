class Palindrome{
    int n;
    public void checkPalindrome(){
        int org = n,rem,rev=0;
        while(n!=0){
            rem = n%10;
            rev = rev*10+rem;
            n = n/10;
        }
        if(org==rev){
            System.out.println("The number is palindrome");
        } else{
            System.out.println("The number isnot palindrome");
        }
    }
    public static void main (String []args){
        Palindrome n1 = new Palindrome();
        n1.n = 121;
        n1.checkPalindrome();

    }

}