#include<stdio.h>
int main(){
    int m;
    printf("Enter Month:");
    scanf("%d", &m);
    if(m==1 || m==5 || m==8 || m==10 || m==12)
    {
        printf("31 days");
    }
    else if (m=2){

        printf("28 or 29 days (depending on leap year)"
    }
    else if(m==4 || m==6 || m==9 || m==11 ) {
        printf("30 days");
    }
    else{
        printf("Invalid month number
")
    }

    
}