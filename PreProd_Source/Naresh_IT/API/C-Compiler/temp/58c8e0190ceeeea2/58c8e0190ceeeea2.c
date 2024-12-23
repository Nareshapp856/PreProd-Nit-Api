#include<stdio.h>
#include<conio.h>
int main()
{
    float cp,sp,p,vat,sc;
    scanf("%.2f",&cp);
    sp= cp+(27*cp)/100;
    p= sp-cp;
    vat= (12.7*sp)/100;
    cs= (3.87*sp)/100;
    printf("Cost Price: Rs.%.2f\n",cp);
    printf("Selling Price: Rs.%.2f\n",sp);
    printf("Profit: Rs.%.2f\n",p);
    printf("VAT (12.7): Rs.%.2f\n",vat);
    printf("Service Charge (3.87): Rs.%.2f",sc);
    return 0;
}