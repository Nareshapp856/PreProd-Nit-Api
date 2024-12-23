public class PalindromeNumberChecker {

 int num=n;
 int rev=0;


 public void checkpalindrome(){
    while(n>0){
       n=num%10;
       rev=rev*10+rem;
       n=n/10;
    }  
     if(num==rev){
         System.out.println("the number is palindrome");
           

      else {
          System.out.println("the number is not palindrome");
      }
      }


  public static void main(String[] args ){
   
     p1.checkpalindrome =new palindrome();

      checkpalindrome(121);
  }
}
}    




