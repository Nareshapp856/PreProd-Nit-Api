public class PalindromeNumberChecker{
    void isPalindrome(int num){
        int  res;
        int copy=num;
        while(num!=0){
            res=(res*10)+num%10;
            num = num/10;
        }
        System.out.println(res);
    }
    public static void main(String [] args){
       PalindromeNumberChecker p1 = new PalindromeNumberChecker();
       p1.isPalindrome(123);
    }
}