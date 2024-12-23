#include <stdio.h>
int isPrime(int n);
int main() {
    int number, result;
    printf("Input a number: ");
    scanf("%d", &number);
    result = isPrime(number);
    if (result == 1) {
        printf("True");
    } else {
        printf("False);
    }
    return 0;
}
int isPrime(int n) {
    if (n <= 1) {
        return 0;
    }
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return 0; 
        }
    }
    return 1;
}