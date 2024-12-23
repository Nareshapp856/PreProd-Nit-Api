#include<stio.h>
int main()
{
    int a,n,b=0,t;
    
    scanf("%d",&n)
    t=n
    while(n>0){
        a=n%10
        b=b+a*a*a;
        n=n/10

    }
    if(b==t){
        printf("Armstrong number:%d");
    }
    else{
        printf("Not an Armstrong number:%d");
    }
}