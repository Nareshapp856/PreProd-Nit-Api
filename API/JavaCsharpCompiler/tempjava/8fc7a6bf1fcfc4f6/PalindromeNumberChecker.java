public class PalindromeNumberChecker {

 int num=121;
 int n=num;
 int rev=0;


 public void checkpalindrome(){
    while(num!=0){
       rem=num%10;
       rev=rev*10+rem;
       num=num/10;
    }  
     if(n==rev){
         System.out.println("the number is palindrome");
           
     }
      else {
          System.out.println("the number is not palindrome");
      }
      
 }

   public static void main(String [] args){
      
      PalindromeNumberChecker=new Palindrome();

   
  
}
    
}



