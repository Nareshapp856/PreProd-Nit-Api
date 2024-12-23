#include <stdio.h>
int main() {
    int a, b, c;
    scanf("%d%d%d", &a, &b, &c);
    printf(a>b ? "max" : a>c ? "max");
    printf(b>a ? "max" : b>c ? "max");
    printf(c>a ? "max" : c>b ? "max");
    return 0;
}