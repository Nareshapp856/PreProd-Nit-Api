#include<stdio.h>
int main(){
 int Subject1,Subject2,Subject3,Subject4,Subject5;
 scanf("%d",Subject1);
  scanf("%d",Subject2);
   scanf("%d",Subject3);
    scanf("%d",Subject4);
    scanf("%d",Subject5);
    float totalMark=Subject1+Subject2+Subject3+Subject4+
    Subject5;
    printf("totalMark %f",totalMark);
     float Percentage=totalMark/100;
     printf("Percentage %f",Percentage);
     if(Percentage<100&&Percentage>90)
    {
        printf("Grade A");
    
    else if(Percentage>75&&Percentage<89){
    printf("Grade B");
    }
    else if(Percentage>50&&Percentage<74)
    {
        printf("Grade C");
    }
     else if(Percentage>35&&Percentage<49)
    {
        printf("Grade D");
    }
     else if(Percentage<35)
    {
        printf("Fail");
    }

    }
    else{
        printf("Enter valid input");
    }
    return 0;
}
