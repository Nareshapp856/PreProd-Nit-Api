#include <stdio.h>
#include <math.h>

int main() {
    int num, originalNum, remainder, result = 0, n = 0;

    
    printf("Enter a number: ");
    

    if (num < 0) {
        printf("Invalid input. Enter a positive number.\n");
        return 0; 
    }

    
    originalNum = num;

    
    while (num != 0) {
        num /= 10;  
        ++n;        
    }

    
    num = originalNum;

    
    while (num != 0) {
        remainder = num % 10;    
        result += pow(remainder, n);  
        num /= 10;               
    }





