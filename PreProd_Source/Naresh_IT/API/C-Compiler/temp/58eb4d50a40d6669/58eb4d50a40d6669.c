#include <stdio.h>

int main() {
    int num;
    printf("Enter a three-digit number: ");
    scanf("%d", &num);
    if (num >= 100 && num <= 999) {
        int prev_multiple = (num / 100) * 100;
        int next_multiple = prev_multiple + 10;
        printf(%d\n", prev_multiple);
        printf(%d\n", next_multiple);
    }
    else {
        printf("Invalid Input\n");
    }

    return 0;
}
