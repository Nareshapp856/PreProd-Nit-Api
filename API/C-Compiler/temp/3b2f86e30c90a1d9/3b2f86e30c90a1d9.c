#include<stdio.h>

int main (){
    float cp, pp, sp, vat, sc;

    scanf("%f", &cp);
    sp = cp + 27*cp/100;

    pp = sp - cp;

    vat = 12.7*sp/100

    sc = 3.87*sp;
    printf("Cost Price: Rs.2.%f", cp);
    printf("Selling Price: Rs.2.%f",sp );
    printf("Profit: Rs.2.%f", pp);
    printf("VAT (12.7 ): Rs.2.%f", vat);
    printf("Service Charge (3.87 ): Rs.2.%f", sc);

}