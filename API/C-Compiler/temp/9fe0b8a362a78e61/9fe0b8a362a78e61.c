#include <stdio.h>

int main() {
    int start, end, sum = 0;

    
   
    if (scanf("%d", &start) != 1) {
        printf("Invalid input. Enter a valid integer.\n");
        return 1;
    }

   
    if (scanf("%d", &end) != 1) {
        printf("Invalid input. Enter a valid integer.\n");
        return 1;
    }

  
    if (start > end) {
        printf("Invalid range. Start number should be less than or equal to end number.\n");
        return 1;
    }

 if(start<n){
    for (int i = start; i <= end; i++) {
        if (i % 2 == 0) {
            sum += i;
        }
    }

   
    printf("Sum of even numbers: %d\n", sum);
}}
    return 0;
}
