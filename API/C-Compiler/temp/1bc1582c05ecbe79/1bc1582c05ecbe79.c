#include<stdio.h>
int main(){
  int num1,num2,res=0;
  scanf("%d %d",&num1,&num2);
  if(num1 <= num2){
    
    while( num1 <= num2 ){
        int mainnum=num1;
        res =0;
        if(mainnum % 2 == 0){
            res = res+mainnum;
        }
        num1++;
    }
    printf("Sum of even numbers: %d",res)
  } else{
    printf("Invalid range. Start number should be less than or equal to end number.");
  }
    return 0;
}