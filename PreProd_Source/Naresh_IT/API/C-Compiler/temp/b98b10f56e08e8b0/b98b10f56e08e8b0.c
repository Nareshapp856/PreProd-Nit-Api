#include<stdio.h>
int main(){
    int cp,sp,p,vat,sc;
    scanf("%d",&cp);
    p=0.27 * cp;
    sp=cp+p;
    vat=0.127 * sp;
    sc=0.0387 * sp;
    printf("Cost Price: Rs.%.2f",cp);
    printf("Selling Price: Rs.%.2f",sp);
    printf("Profit: Rs.%.2f",p);
    printf("VAT (12.7): Rs.%.2f",vat);
    printf("Service Charge (3.87):Rs. %.2f",sc)
}