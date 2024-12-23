#include <stdio.h>
int main() {
    int a, b, c;
    scanf("%d%d%d", &a, &b, &c);
    printf(a>b ? "max" : a>c ? "max" : b>a ? "max" :b>c ? "max" c>a ? "max": c>b ? "max");
    return 0;
}