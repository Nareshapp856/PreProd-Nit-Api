#include <stdio.h>

int main() {
    int n=7, i ;

   
 

    for (i = 2; i <= n / 2; i++) {
        if (n % i == 0) {
    
        printf("%d is a prime number.\n", n);
     else {
        printf("%d is not a prime number.\n", n);
    }

    return 0;
}
