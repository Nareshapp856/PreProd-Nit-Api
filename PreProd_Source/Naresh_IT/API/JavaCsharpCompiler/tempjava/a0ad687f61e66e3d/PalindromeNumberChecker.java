class PalindromeNumber(){
    void isPalindrome(int num){
        int copy=num,res;
        while(num!=0){
            res res*10+num%10;
            num = num/10;
        }
        System.out.println(res);
    }
    public static void main(String [] args){
       PalindromeNumber p1 = new PalindromeNumber();
       p1.isPalindrome(123);
    }
}