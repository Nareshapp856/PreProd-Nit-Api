#include<stdio.h>
int main(){
    int n,start,end;
    scanf("%d",&start);
    scanf("%d",&end);
    for(i=start,es=0;i<=end;i++){
        if(n%2==0){
           es=es+i;
        }
        else printf("Invalid range. Start number should be less than or equal to end number.");
    }
}