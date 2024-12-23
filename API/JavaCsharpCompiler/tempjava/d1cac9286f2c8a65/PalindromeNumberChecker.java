public class PalindromeNumberChecker{
    public static void main(string []args)
    {
        int num=121;
        int copy=num;
        int rev=0;
        int digit;
    }
    do{
        digit=num%10;
        rev=(rev*10)+digit;
        num=num/10;
    }
    while(num!=0);
    if(copy==rev)
    {
        System.out.println("it is a palindrome");
    }
    else{
        System.out.println("it is not a palindrome");
    }
}