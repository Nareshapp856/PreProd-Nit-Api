#include<stdio.h>
int main() {
    int ch;
    float a,b;
    scanf(%c, &ch);
    scanf(%f, &a);
    scanf(%f, &b);
    printf(ch == '+' && a+b || '-' == a-b || '*' == a*b || '/' == a/b);
    return 0;
}