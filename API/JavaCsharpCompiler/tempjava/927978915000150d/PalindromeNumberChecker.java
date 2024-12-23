class PalindromeNumberChecker{
    int num;
    int copy=num;
    public void PalindormeStatus(){
        for(int i=num;i!=0;i/=10){
            int k=num%10;
            int rev=(rev*10)+k;
        }
        if(rev==copy){
            System.out.println("The number is a palindrome");
        }
        else System.out.println("The number is not a palindrome");
    }
    public static void main(String[]args){
        PalindromeNumberChecker p=new  PalindromeNumberChecker();
        p.num=121;
        p.PalindormeStatus();
    }
}