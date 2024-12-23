#include <stdio.h>

int main() {
    int number, positiveCount = 0, negativeCount = 0;

    // scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &number);

        if (number > 0) {
            positiveCount++;
        } else if (number < 0) {
            negativeCount++;
        }
    }

    printf("positive numbers: %d\n", positiveCount);
    printf("Negative numbers: %d\n", negativeCount);

    return 0;
}
