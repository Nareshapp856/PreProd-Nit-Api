#include<stdio.h>
int main() {
    int a,b,c;
    int max =0;
    scanf("%d %d %d", &a, &b, &c);
    a > max ? max = a : max = max;
    b > max ? max = b : max = max;
    c > max ? max = c : max = max;
    printf(a);
    return 0;
}