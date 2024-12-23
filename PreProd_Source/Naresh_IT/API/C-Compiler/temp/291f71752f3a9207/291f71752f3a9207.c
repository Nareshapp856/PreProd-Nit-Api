#include <stdio.h>
int main() {
    int a, b, c;
    scanf("%d%d%d", a, b, c);
    printf(a>b ? "a is max": a>c ? "a is max");
    printf(b>a ? "b is max": b>c ? "b is max");
    printf(c>a ? "c is max": c>b ? "c is max");
    return 0;
}