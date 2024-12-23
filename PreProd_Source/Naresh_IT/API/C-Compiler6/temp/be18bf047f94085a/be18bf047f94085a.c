#include<stdio.h>
#include<ctype.h>
#include<stdbool.h>
#include<string.h>
bool isAplhanummeric(char c){
    return isalnum(c);

}
bool ispalindrome(char*)
int main() {
    char str[] = "A man, a plan, a canal: Panama";
    printf("Enter a string: ");
    scanf("%c", &str);
    if (isPalindrome(str)) {
        printf("true\n");
    } else {
        printf("false\n");
    }
    return 0;
}
printf("Enter a string: ");
scanf("%c", &str);
if(isPalindrome(str)) {
    printf("true\n");
}else{
    printf("false\n");
}
return 0;

}