#include <stdio.h>

int main() {
    int num;
    scanf("%d", &num);
    printf("%s", num > 0 ? (num % 2 == 0 ? " is Even" : " is Odd"));
    return 0;
}
