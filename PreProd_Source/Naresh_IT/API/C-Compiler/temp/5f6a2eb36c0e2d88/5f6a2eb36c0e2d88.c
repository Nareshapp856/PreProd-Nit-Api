#include <stdio.h>
int main() {
    int a, b, c;
    scanf("%d%d%d", &a, &b, &c);
    printf(a>b>c ? "max" : b>c>a ? "max" );
    return 0;
}