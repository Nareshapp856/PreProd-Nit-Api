#include<stdio.h>
int main() {
    char ch;
    float a,b;
    scanf(%c, &ch);
    scanf(%f, &a);
    scanf(%f, &b);
    ch == '+' && printf("%.2f",a+b) || ch == '-' && printf(".2%f",a-b) || ch == '*' && printf(".2%f",a*b) || ch == '/' && printf(".2%f",a/b);
    return 0;
}