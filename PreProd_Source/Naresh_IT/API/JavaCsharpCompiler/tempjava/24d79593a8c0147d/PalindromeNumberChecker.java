class PalindromeNumberChecker{
    int number;
    boolean isPalindrome;
    public void checkPalindrome(){
        int number;
        int copy=num;
        int rev=0;
        int digit;
        do{
            digit=num%10;
            rev=rev*10+digit;
            num=num/10;
        }while(num!=0);
        if(copy==rev){
            System.out.println("The number is a palindrome");
        }else{
            System.out.println("The number is not a palindrome");
        }
    }
    public void palindromeStatus(){
        if(isPalindrome==true){
            return true;
        } return false;
    }
    public static void main(String []args){
        PalindromeNumberChecker p1=new PalindromeNumberChecker();
        p1.number=121;
        p1.checkPalindrome;
        p1.palindromeStatus;
    }
}