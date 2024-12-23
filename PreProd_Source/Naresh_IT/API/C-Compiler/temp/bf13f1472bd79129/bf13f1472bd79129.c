#include<stdio.h>
int main(){
    int n;
    scanf("%d",n);
    n=n/100;
    (n>0&&n<10&&)?printf(("Previous Multiple: %d\nNext Multiple:%d",n*100,(n+1)*100)):printf("Invalid Input");
    return 0;
}