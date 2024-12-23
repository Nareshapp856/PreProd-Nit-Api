#include<stdio.h>
int main()
{
    int n,count=0;
    //printf("enter n value:");
    scanf("%d",&n);
    for(i=0;i<=n;i++){
        if(n%i==0){
            count++;
        }
        if(count==2){
           printf("%d is a prime number.") 
        }
        else{
            printf("%d  is not a prime number. ")
        }
    }
}