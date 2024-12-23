#include <stdio.h>
int isPrime(int n) {
    if (n <= 1) {
        return 0;
    }
    for (int i = 2; i * i <= n; i++){
        if (n % i == 0) {
            return 0;
        }
    }
    return 1;
}
int main() {
    int number=5,6,8,11;
    //printf("Enter a number: ");
    scanf("%[^\n]d");
    int result = isPrime(number);
    if (result == 1) {
        printf(" true.\n", number);
    } else {
        printf(" false.\n", number);
    }
    return 0;
}
