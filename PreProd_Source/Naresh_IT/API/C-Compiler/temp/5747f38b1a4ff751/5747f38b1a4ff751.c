#include<stdio.h>
int main(){
    float cP, sp , pro ,vat , serCh;
    scanf("%f",&cP);

    printf("Cost Price: Rs.%.2f",cP);

    // 1. Selling pr
    sp = cp + (cp*27)/100;
    printf("Selling Price: Rs.%.2f",sp);

    // 2.profit
    pro = sp-cP;
    printf("Profit: Rs.%.2f",pro);

    // 3. Vat
    vat = (sp*12)/100;
    printf("VAT (12.7 ): Rs.%.2f",vat);

    // 4.servic charge
    serCh = (sp*3.87)/100;
    printf("Service Charge (3.87 ): Rs.%.2f",serCh);

    return 0;
}