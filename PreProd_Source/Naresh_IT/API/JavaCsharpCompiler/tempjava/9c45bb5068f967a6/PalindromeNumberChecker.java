public class PalindromeNumberChecker{
    int n,rev=0;
    int m=n;
    public void checkPalindrome(){
        
        do()
        {
            n=n%10;
        rev=rev+(n*10);
        n=n/10;
        
        }while(n!=0);
        palindromeStatus();

    }
    public void  palindromeStatus(){
        if(a==rev){ System.out.println("the number is  pelindrome :");
        }
        else {
            System.out.println("not a pelindrome :");
        }
    }
    public static void main(String[] args){
        palindromeNumberChecker p1 = new palindromeNumberChecker();
        p1.n=121;
        p1.checkPalindrome();

    }
}