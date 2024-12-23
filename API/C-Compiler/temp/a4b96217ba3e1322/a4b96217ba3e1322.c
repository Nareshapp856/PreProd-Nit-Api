#include<stdio.h>
int main(){
    int number ;
    scanf("%d"&number);
    number%2==0 ? printf("%d is Even",number):printf("%d is Odd",number);
}