#include<stdio.h>
int main(){
    float op,sp,pro,VAT,sc;
    printf("give original price\n");
    scanf("%d",&op);
    sp=op+(27%op);
    printf("Selling Price= %d\n",sp);
    pro=sp-op;
    printf("Profit is %d\n",pro);
    // VAT=12.7%sp;
    // printf("VAT is %d",VAT);
    // sc=3.87%sp;
    // printf("service charge is %d\n",sc);
    return 0;
}