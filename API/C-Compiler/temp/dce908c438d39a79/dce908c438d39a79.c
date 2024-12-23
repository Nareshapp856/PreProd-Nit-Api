#include<stdio.h>
int main()
{
    int isArmstrong(int num) {
    int original = num, sum = 0, digits = 0;
    int temp = num;
    while (temp > 0) {
        digits++;
        temp /= 10;
    }
    temp = num;
    while (temp > 0) {
        int digit = temp % 10;
        sum += pow(digit, digits);
        temp /= 10;
    }
     return (sum == original);
}

int main() {
    int N1, N2
    printf("Enter the range (N1 and N2): ");
    scanf("%d %d", &N1, &N2);

    if (N1 > N2) {
        printf("Error: N1 should be less than or equal to N2.\n");
        return 1;
    }

    printf("Armstrong numbers between %d and %d are:\n", N1, N2);
    for (int i = N1; i <= N2; i++) {
        if (isArmstrong(i)) {
            printf("%d\n", i);
        }
    }

    
}
