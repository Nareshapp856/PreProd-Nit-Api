#include<stdio.h>
int main(){
    float op,sp,pro,VAT,sc;
    printf("give original price\n");
    scanf("%f",&op);
    printf("original price = %f\n",op);
    sp=op+(27.0%op);
    printf("Selling Price= %f\n",sp);
    pro=sp-op;
    printf("Profit is %f\n",pro);
    VAT=12.7%sp;
    printf("VAT is %f",VAT);
    sc=3.87%sp;
    printf("service charge is %f\n",sc);
    return 0;
}