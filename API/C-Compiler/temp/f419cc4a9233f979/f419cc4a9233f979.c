#include<stdio.h>
int main(){
    int op,sp,pro;
    float VAT,sc;
    printf("give original price\n");
    scanf("%d",&op);
    sp=op+(27%op);
    printf("Selling Price= %d\n",sp);
    pro=sp-op;
    printf("Profit is %d\n",pro);
    VAT=12.7%sp;
    printf("VAT is %f",VAT);
    sc=3.87%sp;
    printf("service charge is %f\n",sc);
    return 0;
}