#include <stdio.h>
int main() {
    int a, b, c;
    scanf("%d%d%d", a, b, c);
    printf(a>b ? "a is max": a>c ? "a is max": c>a ? "c is max");
    return 0;
}