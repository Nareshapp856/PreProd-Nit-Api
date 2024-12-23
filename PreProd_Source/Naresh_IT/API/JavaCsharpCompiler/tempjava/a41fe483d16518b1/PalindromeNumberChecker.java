public class PalindromeNumberChecker{
    public static void checkPalidrome(){
        int no=121;
        int num=no;
        int rev=0;
        while(no!=0){
            int rem=no%10;
            rev=rev*10+rem;
            no=no/10;
        }
        if(num==rev){
            System.out.println("palidrome no"+rev);
        }
        else{
            System.out.println("not palidrome"+rev);
        }

    }
    public static void palidromeSatus(){
        checkPalidrome();
    }
    public static void main(String[]args ){
        palidromeSatus();
    }
}