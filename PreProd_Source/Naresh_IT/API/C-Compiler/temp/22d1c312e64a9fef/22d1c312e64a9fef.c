#include<stdio.h>

int main()
{
int sub1, sub2, sub3, sub4, sub5, tmarks, per;

// printf("marks1: ");
scanf("%d""%d""%d""%d""%d", &sub1, &sub2, &sub3, &sub4, &sub5);

if ((sub1<0 || sub1>100) || (sub2<0 || sub2>100) || (sub3<0 || sub3>100) || (sub4<0 || sub4>100) || (sub5<0 || sub5>100))
{
    // printf("Error;")
}

else if ((sub1<35) || (sub2<35) || (sub3<35) || (sub4<35) || (sub5<35))
printf("Fail")

else if ((sub1>35) || (sub2>35) || (sub3>35) || (sub4>35) || (sub5>35))
{
    tmarks = sub1+sub2+sub3+sub4+sub5;
    printf("Total Marks: %d", &tmarks);
    per = ((tmarks/500)*100);
    printf("Percentage: %0.2f%", &per);

    if(per>=90 && per<=100)
    printf("Grade A");
    if(per>=75 && per<=89)
    printf("Grade B");
    if(per>=50 && per<=74)
    printf("Grade C");
    if(per>=35 && per<=49)
    printf("Grade D");   

}

return 0;
}