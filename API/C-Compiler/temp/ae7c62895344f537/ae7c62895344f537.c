#include<stdio.h>
int main()
{
    int marks,s1,s2,s3,s4,s5,totalmarks,p;
    scanf("%d",&s1);
    scanf("%d",&s2);
    scanf("%d",&s3);
    scanf("%d",&s3);
    scanf("%d",&s5);
    if{(totalmarks>0||totalmarks<100)
    printf("invalid");}
    switch(marks){
    case 10:
    if(p<90||p>100)
    totalmarks=s1+s2+s3+s4+s5;
    p=totalmarks/5;
    printf("Grade A");
    case 9:
    if(p<75||p>89)
    p=totalmarks/5;
    printf("Grade B");
    case 8:
    if(p<50||p>74)
    p=totalmarks/5;
    printf("Grade c");
    case 7:
    if(p<35||p>49)
    p=totalmarks/100;
    printf("Grade d");
    default:
    printf("fail");
    }
    
}