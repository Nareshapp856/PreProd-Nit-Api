#include<stdio.h>
int main(){
    int op,sp,pro,VAT,sc;
    printf("give original price");
    scanf("%d",&op);
    sp=op+(27%op);
    printf("Selling Price= %d",sp);
    pro=sp-op;
    printf("Profit is %d",pro);
    VAT=12%sp:
    printf("VAT is",VAT);
    sc=4%sp;
    printf("service charge is %d",sc)
    return 0;
}