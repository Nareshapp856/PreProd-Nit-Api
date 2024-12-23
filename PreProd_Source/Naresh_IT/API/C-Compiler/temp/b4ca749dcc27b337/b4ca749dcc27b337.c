#include<stdio.h>
int main()
{
    int start,end,i,j,sum=0;
    scanf("%d%d",&start,&end);
    for(i=start;i<=end;i++){
        for(j=1;j<=end;j++){
            if(i%j==0){
                sum=sum+j;
            }
            printf("Sum of even numbers:%d",sum);
        }
    }
}