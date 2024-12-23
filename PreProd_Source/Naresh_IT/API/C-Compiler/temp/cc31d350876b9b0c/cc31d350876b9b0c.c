#include<stdio.h>
int main(){
    int n,start,end,es=0;
    scanf("%d",&start);
    scanf("%d",&end);
    for( int i=start,es=0;i<=end;i++){
        if(n%2==0){
           es=es+n;
        }
       
    }
    printf("Sum of even numers:%d",es);
     else printf("Invalid range. Start number should be less than or equal to end number.");
}