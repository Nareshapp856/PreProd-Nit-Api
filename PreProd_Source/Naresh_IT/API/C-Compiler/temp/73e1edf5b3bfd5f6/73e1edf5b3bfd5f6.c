#include <stdio.h>
#include <math.h>

int main() {
    int n, temp, count = 0, digit, sum = 0;

    printf("Enter a number: ");
    scanf("%d", &n);

    temp = n;

    
    while (temp != 0) {
        temp = temp / 10;
        count++;
    }

    temp = n;

    
    while (temp != 0) {
        digit = temp % 10;
        sum += pow(digit, count);
        count--;
        temp /= 10;
    }

    
    if (sum == n) {
        printf("%d\n" is a Disarium number.",n);
    } else {
        printf("%d\n" is not a Disarium number.",n);
    }

    return 0;
}
