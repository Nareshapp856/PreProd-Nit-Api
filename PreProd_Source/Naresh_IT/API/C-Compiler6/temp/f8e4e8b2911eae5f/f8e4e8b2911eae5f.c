#include <stdio.h>
#include <ctype.h>

int sumOfStringNum(char s[]) {
    int sum = 0, num = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        if (isdigit(s[i])) {  
            num = num * 10 + (s[i] - '0');  
        } else {
            sum += num; 
            num = 0;    
        }
    }
    sum += num;  
    return sum;
//}

//int main() {
  //  char str[100];
    
    //printf("Enter a string: ");
    //fgets(str, sizeof(str), stdin);
    
    //int result = sumOfStringNum(str);
    //printf("Sum of numbers in the string: %d\n", result);
    
    return 0;
}
