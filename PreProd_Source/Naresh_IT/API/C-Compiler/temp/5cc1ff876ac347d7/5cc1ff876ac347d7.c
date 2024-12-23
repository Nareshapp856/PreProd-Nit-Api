#include<stdio.h>

    int main(){
        int n,i=0,c=0;
scanf("%d",&n);
for(i=0;i<=n;i++){
    if(n>0)
        if(i%2!=0)c++;
        if(c==2)
        {
            printf("%d prime number",n);
        }
        else if(n<0){
            printf("invalid input");
        }
        else {
            printf("%d is not a Prime number",n);
        }
    

return 0;
    }
