#include<stdio.h>
int main()
{
    int side, length, breath, area_of_sqaure, area_of_rectangle;
    scanf("%d",&side);
    scanf("%d",&length);
    scanf("%d",&breath);

    area_of_sqaure = side*side;
    area_of_rectangle = length*breath;

    printf("%d.00\n",area_of_sqaure);
    printf("%d.00",area_of_rectangle);
    return 0;