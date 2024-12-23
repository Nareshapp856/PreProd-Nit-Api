#include<stdio.h>
int main(){
    int m;
    printf("Enter Month:");
    scanf("%d", &m);
    if(m==1 || m==2 || m==5 || m==7 || m==9 || m==11)
    {
        printf("31 days")
    }
    else {
        printf("30 days")
    }

    
}