#include<stdio.h>
int main(){
    int num1,num2,add;
    char opr;
    scanf("%c",&opr);
    scanf("%d",&num1);
    scanf("%d",&num2);
    
    opr=='+' && add=(num1 + num2);
    printf("%.2f",add);
    return 0;
}